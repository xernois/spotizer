import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Song } from '@src/app/models/song.model';
import { LikeService } from '@src/app/services/like.service';
import { PlayerService } from '@src/app/services/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {

  currentSong: Song | undefined;

  constructor(
    public playerService: PlayerService,
    public like: LikeService
  ) { }

  ngOnInit(): void {
    this.updatePlayerInfos()
  }

  previousSong() {
    this.playerService.previousSong();
    this.updatePlayerInfos()
  }

  nextSong() {
    this.playerService.nextSong();
    this.updatePlayerInfos()
  }

  togglePlay() {
    this.playerService.playing$.next(!this.playerService.playing$.value)
  }

  toggleMute() {
    this.playerService.muteUnmute();
  }

  updatePlayerInfos() {
    console.log(this.currentSong)
    this.currentSong = this.playerService.getCurrentSong();
  }
}
