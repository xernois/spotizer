import { Component, Input } from '@angular/core';
import { Album } from '@src/app/models/album.model';
import { LikeService } from '@src/app/services/like.service';
import { PlayerService } from '@src/app/services/player.service';

@Component({
  selector: 'app-album-card',
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.scss']
})
export class AlbumCardComponent {
  @Input() album!: Album;

  constructor(
    private playerService: PlayerService,
    public like: LikeService
  ) { }

  playAlbum(album: Album) {
    this.playerService.musicQueue = [...album.songs]
    this.playerService.updateCurrentSong()
    this.playerService.playing$.next(true)
  }
}
