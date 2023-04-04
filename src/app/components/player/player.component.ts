import { Component, OnInit } from '@angular/core';
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

    this.playerService.currentSong$.subscribe((song) => {
      this.currentSong = song
      console.log(song)
    })
  }

  previousSong() {
    this.playerService.previousSong();
  }

  nextSong() {
    this.playerService.nextSong();
  }

  togglePlay() {
    this.playerService.playing$.next(!this.playerService.playing$.value)
  }

  toggleMute() {
    this.playerService.muteUnmute();
  }
}
