import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Song } from '@models/song.model';
import { SongService } from '@services/api/song.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  playing$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  musicQueue: Song[] = [];

  oldVolume: number = 50;
  volumeControl = new FormControl(50);
  progressionControl = new FormControl();

  constructor() {}

  getCurrentSong(): Song {
    return this.musicQueue[0];
  }

  getCurrentSongYoutubeId(): string {
    return this.getCurrentSong().youtube.split('/').at(-1) || '';
  }

  previousSong() {
    const lastSong = this.musicQueue.pop();
    if (lastSong) this.musicQueue.unshift(lastSong);
  }

  nextSong() {
    const current = this.musicQueue.shift();
    if (current) this.musicQueue.push(current);
  }

  muteUnmute() {
    if (this.volumeControl.value === 0) {
      this.volumeControl.setValue(this.oldVolume);
    } else {
      this.oldVolume = this.volumeControl.value || this.oldVolume;
      this.volumeControl.setValue(0);
    }
  }
}
