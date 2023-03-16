import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PlayerState } from '../enums/player.enum';
import { Song } from '../models/song.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  state: PlayerState = PlayerState.PAUSED;

  musicQueue: Song[] = [];

  constructor() { }

  addMusicToQueue(song: Song) {
    this.musicQueue.push(song);
  }

  getMusicQueue() {
    return this.musicQueue;
  }

  getCurrentSong() {
    return this.musicQueue[0];
  }

  removeMusicFromQueue(song: Song) {
    this.musicQueue = this.musicQueue.filter(music => music !== song);
  }

  playMusic() {
    this.state = PlayerState.PLAYING;
  }

  pauseMusic() {
    this.state = PlayerState.PAUSED;
  }
}
