import { Component } from '@angular/core';
import { PlayerState } from '@src/app/enums/player.enum';
import { PlayerService } from '@src/app/services/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {

  constructor(
    public playerService: PlayerService
  ) { }

  toggleClick() {
    if (this.playerService.state === PlayerState.PLAYING) {
      this.playerService.pauseMusic();
    } else {
      this.playerService.playMusic();
    }
  }
}
