import { Component, OnInit } from '@angular/core';
import { Album } from '@models/album.model';
import { Observable, of } from 'rxjs';
import { Artist } from '@models/artist.model';
import { LikeService } from '@services/like.service';
import { ApiService } from '@services/api/api.service';
import { PlayerService } from '@services/player.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  albums: Album[] = [];
  artist!: Observable<Artist>
  page = 1
  isPossiblyMore = true
  isLoading = false

  constructor(
    private playerService: PlayerService,
    private apiService: ApiService,
    public like: LikeService

  ) { }

  ngOnInit(): void {
    this.loadMore(true)
  }

  loadMore(shouldLoad: boolean) {
    if(this.isPossiblyMore && shouldLoad && !this.isLoading) {
      this.isLoading = true;
      this.apiService.resolveAlbum({page: this.page++}).subscribe(albums => {
        if(!albums?.length) this.isPossiblyMore = false
        this.isLoading = false
        this.albums.push(...albums)
      })
    }
  }
}
