import { Injectable } from '@angular/core';
import { AppPlayer, AppUser } from '../models/app.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getUser() {
    let userData
    try {
      userData = JSON.parse(localStorage.getItem('user') || '');
      if (!(userData satisfies AppUser)) throw new Error('User data is not valid');
    } catch {
      const name = `Guest_${Math.floor(Math.random() * 10000)}`
      userData = { name, image: `https://api.dicebear.com/5.x/fun-emoji/svg?seed=${name}`}
      this.setUser(userData)
    }
    return userData
  }

  setUser(user: AppUser) {
    localStorage.setItem('user', JSON.stringify(user))
  }

  getPlayerSettings() {
    let playerSettings
    try {
      playerSettings = JSON.parse(localStorage.getItem('playerSettings') || '');
      if (!(playerSettings satisfies AppPlayer)) throw new Error('player settings data is not valid');
    } catch {
      playerSettings = { volume: 50}
      this.setPlayerSettings(playerSettings)
    }
    return playerSettings
  }

  setPlayerSettings(player: AppPlayer) {
    localStorage.setItem('playerSettings', JSON.stringify(player))
  }
}
