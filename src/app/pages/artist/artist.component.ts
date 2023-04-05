import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Artist } from '@src/app/models/artist.model';
import { ApiService } from '@src/app/services/api/api.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent {

  artists!: (Artist & { url?: string })[];

  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.apiService.resolveArtist().subscribe(artist => {
      this.artists = artist
    })
  }
}


