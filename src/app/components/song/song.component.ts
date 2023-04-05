import { Component, Input } from '@angular/core';
import { Song } from '@src/app/models/song.model';
import { PlayerService } from '@src/app/services/player.service';
import { LikeService } from '@src/app/services/like.service';


@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent {
  @Input() song!: Song;
  @Input() index!: number;
  @Input() queue!: Song[];

  constructor(
    public like: LikeService,
    private playerService: PlayerService,
  ) {}

  playSong(id: number, queue: Song[]) {
    this.playerService.musicQueue = [...queue]
    for (let i = 1; i< id; i++) {
      this.playerService.nextSong()
    }
    this.playerService.updateCurrentSong()
    this.playerService.playing$.next(true)
  }
}
