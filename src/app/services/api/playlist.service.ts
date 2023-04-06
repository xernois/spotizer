import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ApiEndpoint } from '@src/app/enums/api-endpoint.enum';
import { LocalStorageService } from '../local-storage.service';
import { forkJoin, map, tap } from 'rxjs';
import { Playlist } from '@src/app/models/playlist.model';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(
    private api: ApiService,
    private localStorage: LocalStorageService
  ) { }

  newPlaylist() {
    return this.api.post<Playlist>({ endpoint: ApiEndpoint.PLAYLIST }, { name: 'New Playlist' }).pipe(tap(playlist => this.localStorage.addPlaylist(playlist.id)))
  }

  getPlaylist(id?: number) {
    return this.api.resolvePlaylist({ id }).pipe(map(results => results[0]));
  }

  getPlaylists() {
    const ids = this.localStorage.getPlaylists();
    return forkJoin(ids.map(id => this.api.resolvePlaylist({ id }).pipe(map(results => results[0]))));
  }
}
