import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Song } from '@models/song.model';
import { SongService } from '@services/api/song.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  playing: boolean = false;
  musicQueue: Song[] = [];

  oldVolume: number = 50;
  volume: number = 50;
  VolumeControl = new FormControl();

  constructor(
    private songService: SongService
  ) {
    this.musicQueue = [] //this.songService.getDataJS()

    this.VolumeControl.valueChanges.subscribe((value: number) => {
      this.volume = value;
    })
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
    if (this.volume === 0) {
      this.volume = this.oldVolume;
    } else {
      this.oldVolume = this.volume;
      this.volume = 0;
    }
  }

}
