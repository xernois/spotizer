import { HttpClient } from '@angular/common/http';
import { ApiEndpoint } from '@enums/api-endpoint.enum';
import { delay, forkJoin, map, Observable, toArray } from 'rxjs';
import { environment } from '@environments/environment';
import { parseSlug } from '@src/app/functions/slug.function';
import { Album } from '@src/app/models/album.model';
import { Artist } from '@src/app/models/artist.model';
import { Song } from '@src/app/models/song.model'
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  private getData<T>(endpoint: ApiEndpoint, id?: number) {
    if (id) {
      return this.http.get<T>(environment.apiUrl + endpoint + '/' + id).pipe(toArray())
    } else {
      return this.http.get<T[]>(environment.apiUrl + endpoint)
    }
  }

  private getDataFromUrl<T>(url: string) {
    return this.http.get<T>(environment.appUrl + url).pipe(toArray())
  }


  public resolveAlbum(id?: number) {
    const data$ = this.getData<Album>(ApiEndpoint.ALBUM, id)

    return data$.pipe(
      map(albums => {
        return albums.map(album => {
          album.getArtist = (() => {
            let artist: Observable<Artist>;
            return () => {
              if (!artist) artist = this.getData<Artist>(ApiEndpoint.ARTIST, parseSlug(album.artist.id.toString())).pipe(delay(500), map(artists => artists[0]))
              return artist
            }
          })();
          return album
        });
      })
    );
  }

  public resolveArtist(id?: number) {
    const data$ = this.getData<Artist>(ApiEndpoint.ARTIST, id)

    return data$.pipe(
      map(artist => {
        return artist.map(artist => {
          artist.getAlbums = (() => {
            let albums: Observable<Album[]>;
            return () => {
              if (!albums) albums = forkJoin<Album[][]>(artist.albums.map(albumUrl => this.getDataFromUrl<Album>(albumUrl))).pipe(delay(500), map((artists) => artists[0]))
              return albums
            }
          })();

          artist.getSongs = (() => {
            let songs: Observable<Song[]>;
            return () => {
              if (!songs) songs = forkJoin<Song[][]>(artist.albums.map(songUrl => this.getDataFromUrl<Song>(songUrl))).pipe(delay(500), map((songs) => songs[0]))
              return songs
            }
          })();
          return artist
        });
      })
    );
  }

  public resolveSong(id?: number) {
    const data$ = this.getData<Song>(ApiEndpoint.SONG, id)

    return data$.pipe(
      map(song => {
        return song.map(song => {
          song.getAlbum = (() => {
            let album: Observable<Album>;
            return () => {
              if (!album) album = this.getDataFromUrl<Album>(song.album).pipe(map((albums) => albums[0]))
              return album
            }
          })();
          song.getArtist = (() => {
            let artist: Observable<Artist>;
            return () => {
              if (!artist) artist = this.getDataFromUrl<Artist>(song.album).pipe(map((albums) => albums[0]))
              return artist
            }
          })();

          return song
        });
      })
    );
  }

}
