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

  getPlaylists() {
    let playlists: number[]
    try {
      playlists = JSON.parse(localStorage.getItem('playlists') || '');
      if (!Array.isArray(playlists)) throw new Error('playlists data is not valid');
    } catch {
      playlists = []
      this.setPlaylists(playlists)
    }
    return playlists
  }

  setPlaylists(playlists: number[]) {
    localStorage.setItem('playlists', JSON.stringify(playlists))
  }

  addPlaylist(id: number) {
    const playlists = this.getPlaylists()
    if (!playlists.includes(id)) {
      playlists.push(id)
      this.setPlaylists(playlists)
    }
  }

  deletePlaylist(id: number) {
    const playlists = this.getPlaylists()
    if (playlists.includes(id)) {
      this.setPlaylists(playlists.filter(playlistId => playlistId != id))
    }
  }

  updatePlaylist(oldId: number, newId: number) {
    const playlists = this.getPlaylists()
    if (playlists.includes(oldId) && !playlists.includes(newId)) {
      const index = playlists.findIndex(playlistId => playlistId === oldId)
      if(index === -1 ) return 
      playlists[index] = newId
      this.setPlaylists(playlists)
    }
  }
}
