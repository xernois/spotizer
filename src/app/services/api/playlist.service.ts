import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ApiEndpoint } from '@src/app/enums/api-endpoint.enum';
import { LocalStorageService } from '../local-storage.service';
import { Subject, forkJoin, map, of, switchMap, tap } from 'rxjs';
import { Playlist } from '@src/app/models/playlist.model';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  onPlaylistChange = new Subject()

  constructor(
    private api: ApiService,
    private localStorage: LocalStorageService
  ) { }

  newPlaylist() {
    return this.api.post<Playlist>({ endpoint: ApiEndpoint.PLAYLIST },
      { "name": 'New Playlist' }
    ).pipe(tap(playlist => (this.localStorage.addPlaylist(playlist.id), this.onPlaylistChange.next(null))))
  }

  addSongToPlaylist(playlistId: number, songId: number) {
    return this.getPlaylist(playlistId).pipe(switchMap(playlist => {
      return this.api.patch<Playlist>({ endpoint: ApiEndpoint.PLAYLIST, id: playlistId }, { "songs": [...new Set([...playlist.songs.map((song) => `/~morap01/L250/public/index.php/api/songs/${song.id}`), `/~morap01/L250/public/index.php/api/songs/${songId}`])] }).pipe(tap(_ => this.onPlaylistChange.next(null)))
    }))
  }

  getPlaylist(id?: number) {
    return this.api.resolvePlaylist({ id }).pipe(map(results => results[0]));
  }

  getPlaylists() {
    const ids = this.localStorage.getPlaylists();
    return forkJoin(ids.map(id => this.api.resolvePlaylist({ id }).pipe(map(results => results[0]))));
  }

  deleteById(id: number) {
    this.localStorage.deletePlaylist(id);
    this.onPlaylistChange.next(null)
  }

  updateName(id: number, name: string) {
    return this.getPlaylist(id).pipe(switchMap(playlist => {
      return this.api.post<Playlist>({ endpoint: ApiEndpoint.PLAYLIST }, { name }).pipe(switchMap(pl => {
        return this.api.patch<Playlist>({ endpoint: ApiEndpoint.PLAYLIST, id: pl.id }, { songs: playlist.songs.map((song) => `/~morap01/L250/public/index.php/api/songs/${song.id}`) })
        .pipe(tap(playlist => (this.localStorage.updatePlaylist(id, playlist.id), this.onPlaylistChange.next(null))))
      }))
    }))
  }

  search(query: string) {
    return this.getPlaylists().pipe(switchMap(playlist => {
      return of(playlist.filter(({name}) => name.toUpperCase().includes(query.toUpperCase()) ))
    }))
  }

  deleteSongById(playlistId: number, songId: number) {
    return this.getPlaylist(playlistId).pipe(switchMap(playlist => {
      return this.api.patch<Playlist>({ endpoint: ApiEndpoint.PLAYLIST, id: playlistId }, { "songs": playlist.songs.filter(({id}) => id !== songId).map((song) => `/~morap01/L250/public/index.php/api/songs/${song.id}`) }).pipe(tap(_ => this.onPlaylistChange.next(null)))
    }))
  }
}
