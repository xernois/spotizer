import { Component } from '@angular/core';
import { Artist } from '@src/app/models/artist.model';
import { ApiService } from '@src/app/services/api/api.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent {

  artists!: (Artist & { url?: string })[];
  page = 1
  isPossiblyMore = true
  isLoading = false

  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.apiService.resolveArtist({ id : undefined }).subscribe(artist => {
      this.artists = artist
    })
  }

  loadMore(shouldLoad: boolean) {
    if(this.isPossiblyMore && shouldLoad && !this.isLoading) {
      this.isLoading = true;
      this.apiService.resolveArtist({page: this.page++}).subscribe(artists => {
        if(!artists?.length) this.isPossiblyMore = false
        this.isLoading = false
        this.artists.push(...artists)
      })
    }
  }
}


