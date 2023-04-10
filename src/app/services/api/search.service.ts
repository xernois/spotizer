import { Injectable } from '@angular/core';
import { SearchQuery } from '@src/app/models/search.model';
import { Observable, forkJoin, map, tap } from 'rxjs';
import { ApiService } from './api.service';
import { ApiEndpoint } from '@src/app/enums/api-endpoint.enum';
import { Album } from '@src/app/models/album.model';
import { Artist } from '@src/app/models/artist.model';
import { Song } from '@src/app/models/song.model';
import { Playlist } from '@src/app/models/playlist.model';
import { PlaylistService } from './playlist.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private api: ApiService,
    private playlist: PlaylistService
  ) { }

  search(query: SearchQuery) {
    return forkJoin([
      (this.api.search(ApiEndpoint.ALBUM, { title: query }) as Observable<Album[]>).pipe(map(list => ({ albums: list.slice(0, 5) }))),
      (this.api.search(ApiEndpoint.SONG, { title: query }) as Observable<Song[]>).pipe(map(list => ({ songs: list.slice(0, 5) }))),
      (this.api.search(ApiEndpoint.ARTIST, { name: query }) as Observable<Artist[]>).pipe(map(list => ({ artists: list.slice(0, 5) }))),
      this.playlist.search(query).pipe(map(list => ({ playlists: list.slice(0, 5) }))),
    ]).pipe(map(result => result.reduce((acc, curr) => ({ ...acc, ...curr }), { songs: [], albums: [], artists: [], playlists: [] })))
  }
}
