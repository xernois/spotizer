import { Component, OnInit } from '@angular/core';
import { PlayerService } from '@src/app/services/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  constructor(
    public playerService: PlayerService
  ) { }

  ngOnInit(): void { }

  previousSong() {
    this.playerService.previousSong();
  }

  nextSong() {
    this.playerService.nextSong();
  }

  togglePlay() {
    this.playerService.playing = !this.playerService.playing;
  }

  initPlayer() {
    console.log('init player');
  }
}
