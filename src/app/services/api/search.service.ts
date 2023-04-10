import { Injectable } from '@angular/core';
import { SearchQuery } from '@src/app/models/search.model';
import { forkJoin, map } from 'rxjs';
import { ApiService } from './api.service';
import { ApiEndpoint } from '@src/app/enums/api-endpoint.enum';
import { Album } from '@src/app/models/album.model';
import { Artist } from '@src/app/models/artist.model';
import { Song } from '@src/app/models/song.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private api: ApiService
  ) { }

  search(query: SearchQuery) {
    return forkJoin([
      this.api.search<Album>(ApiEndpoint.ALBUM, { title: query }).pipe(map(list => ({ albums: list.slice(0, 5) }))),
      this.api.search<Song>(ApiEndpoint.SONG, { title: query }).pipe(map(list => ({ songs: list.slice(0, 5) }))),
      this.api.search<Artist>(ApiEndpoint.ARTIST, { name: query }).pipe(map(list => ({ artists: list.slice(0, 5) }))),
    ]).pipe(map(result => result.reduce((acc, curr) => ({ ...acc, ...curr }), { songs: [], albums: [], artists: [] })))
  }
}
