import { Injectable } from '@angular/core';
import { AppLike, AppPlayer, AppUser } from '../models/app.model';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor() { }

  toggleSongLike(songId: number) {
    let like
    try {
      like = JSON.parse(localStorage.getItem('like') || '');
      like.songs.includes(songId) ? like.songs.splice(like.songs.indexOf(songId), 1) : like.songs.push(songId)
      if (!(like satisfies AppLike)) throw new Error('Lik datas are not valid');
    } catch {
      like = { songs: [songId], albums: [] }
    }
    localStorage.setItem('like', JSON.stringify(like))
  }

  isSongLiked(songId: number) {
    try {
      const like = JSON.parse(localStorage.getItem('like') || '');
      console.log(like)
      return like.songs.includes(songId)
    } catch {
      return false
    }
  }

  isAlbumLiked(albumId: number) {
    try {
      const like = JSON.parse(localStorage.getItem('like') || '');
      return like.albums.includes(albumId)
    } catch {
      return false
    }
  }

  toggleAlbumLike(albumId: number) {
    let like
    try {
      like = JSON.parse(localStorage.getItem('like') || '');
      like.albums.includes(albumId) ? like.albums.splice(like.albums.indexOf(albumId), 1) : like.albums.push(albumId)
      if (!(like satisfies AppLike)) throw new Error('Lik datas are not valid');
    } catch {
      like = { songs: [], albums: [albumId] }
    }
    localStorage.setItem('like', JSON.stringify(like))
  }
}
