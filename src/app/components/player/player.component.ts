import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Song } from '@src/app/models/song.model';
import { PlayerService } from '@src/app/services/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {

  currentSong: Song | undefined;
  progression: number;

  constructor(
    public playerService: PlayerService
    ) {
      this.progression = 1;
    }

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
    this.currentSong = this.playerService.getCurrentSong();
  }

  handleProgressionChange(event: any) {
    this.progression = event;
  }
}
