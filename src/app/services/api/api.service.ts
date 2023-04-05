import { HttpClient } from '@angular/common/http';
import { ApiEndpoint } from '@enums/api-endpoint.enum';
import { delay, forkJoin, map, Observable, toArray } from 'rxjs';
import { environment } from '@environments/environment';
import { parseSlug, slugify } from '@src/app/functions/slug.function';
import { Album } from '@src/app/models/album.model';
import { Artist } from '@src/app/models/artist.model';
import { Song } from '@src/app/models/song.model'
import { Injectable } from '@angular/core';

type resolveParam = { id?: number, url?: string, page?: number }

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  private getData<T>(endpoint: ApiEndpoint, id?: number, page = 1) {
    if (id) {
      return this.http.get<T>(environment.apiUrl + endpoint + '/' + id).pipe(toArray())
    } else {
      return this.http.get<T[]>(environment.apiUrl + endpoint+ `?page=${page}`)
    }
  }

  private getDataFromUrl<T>(url: string, page = 1) {
    return this.http.get<T>(environment.appUrl + url).pipe(toArray())
  }


  public resolveAlbum({ id, url, page }: resolveParam) {
    let data$: Observable<Album[]>;
    if (url) data$ = this.getDataFromUrl<Album>(url, page)
    else data$ = this.getData<Album>(ApiEndpoint.ALBUM, id, page)

    return data$.pipe(
      map(albums => {
        return albums.map(album => {
          album.getArtist = (() => {
            let artist: Observable<Artist>;
            return () => {
              if (!artist) artist = this.resolveArtist({ id: parseSlug(album.artist.id.toString()) }).pipe(map(artists => artists[0]))
              return artist
            }
          })();

          album.url = slugify(album.title) + '-' + album.id

          return album
        });
      })
    );
  }

  public resolveArtist({ id, url }: resolveParam) {
    let data$: Observable<Artist[]>;

    if (url) data$ = this.getDataFromUrl<Artist>(url)
    else data$ = this.getData<Artist>(ApiEndpoint.ARTIST, id)

    return data$.pipe(
      map(artist => {
        return artist.map(artist => {
          artist.getAlbums = (() => {
            let albums: Observable<Album[]>;
            return () => {
              if (!albums) albums = forkJoin<Album[][]>(artist.albums.map(albumUrl => this.resolveAlbum({ url: albumUrl }))).pipe(map((artists) => artists[0]))
              return albums
            }
          })();

          artist.getSongs = (() => {
            let songs: Observable<Song[]>;
            return () => {
              if (!songs) songs = forkJoin<Song[][]>(artist.albums.map(songUrl => this.resolveSong({ url: songUrl }))).pipe(map((songs) => songs[0]))
              return songs
            }
          })();

          return artist
        });
      })
    );
  }

  public resolveSong({ id, url }: resolveParam) {
    let data$: Observable<Song[]>;

    if (url) data$ = this.getDataFromUrl<Song>(url)
    else data$ = this.getData<Song>(ApiEndpoint.SONG, id)

    return data$.pipe(
      map(song => {
        return song.map(song => {
          song.getAlbum = (() => {
            let album: Observable<Album>;
            return () => {
              if (!album) album = this.resolveAlbum({ url: song.album }).pipe(map((albums) => albums[0]))
              return album
            }
          })();

          song.getArtist = (() => {
            let artist: Observable<Artist>;
            return () => {
              if (!artist) artist = this.resolveArtist({ url: song.album }).pipe(map((artist) => artist[0]))
              return artist
            }
          })();

          return song
        });
      })
    );
  }

}
