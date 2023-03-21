import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Song } from '@models/song.model';
import { SongService } from '@services/api/song.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  playing$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  musicQueue: Song[] = [];

  oldVolume: number = this.localStorage.getPlayerSettings().volume;
  volumeControl = new FormControl(this.localStorage.getPlayerSettings().volume);
  progressionControl = new FormControl(0);

  constructor(
    private localStorage: LocalStorageService
  ) {
    this.volumeControl.valueChanges.subscribe(value => {
      this.localStorage.setPlayerSettings({ volume: value || 50 });
    });
  }

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
