import { Injectable } from '@angular/core';
import { AppLike } from '../models/app.model';
import { Song } from '@models/song.model';
import { Album } from '@models/album.model';
import { concatAll, forkJoin, map, toArray } from 'rxjs';
import { ApiService } from './api/api.service';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(
    private apiService: ApiService
  ) { }

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

  getAllLikedSong() {
    let result;
    try {
      let like = JSON.parse(localStorage.getItem('like') || '{}');
      if (like.songs?.length) result = forkJoin<Song[][]>(like.songs?.map((songId: number) => this.apiService.resolveSong({id: songId}))).pipe(concatAll(), map(x => x[0]), toArray())
      else return null
    } catch (e) {
      result = null
    }

    return result
  }

  getAllLikedAlbum() {
    let result;
    try {
      let like = JSON.parse(localStorage.getItem('like') || '');
      result = forkJoin<Album[][]>(like.albums.map((albumId: number) => this.apiService.resolveAlbum({id: albumId}))).pipe(concatAll(), map(x => x[0]), toArray())
    } catch {
      result = null
    }

    return result
  }
}
