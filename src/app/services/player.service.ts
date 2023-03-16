import { Injectable } from '@angular/core';
import { Song } from '@models/song.model';
import { SongService } from '@services/api/song.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  playing: boolean = false;
  musicQueue: Song[] = [];

  constructor(
    private songService: SongService
  ) {
    this.musicQueue = this.songService.getDataJS()
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
}
