import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApiEndpoint } from '@enums/api-endpoint.enum';
import { delay, forkJoin, map, Observable, tap, toArray } from 'rxjs';
import { environment } from '@environments/environment';
import { parseSlug, slugify } from '@src/app/functions/slug.function';
import { Album } from '@src/app/models/album.model';
import { Artist } from '@src/app/models/artist.model';
import { Song } from '@src/app/models/song.model'
import { Injectable, enableProdMode } from '@angular/core';
import { Playlist } from '@src/app/models/playlist.model';
import { SearchObject } from '@src/app/models/search.model';

type resolveParam = { id?: number, url?: string, page?: number, endpoint?: ApiEndpoint, name?:string, title?:string }

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  isApiOk: boolean | undefined;

  constructor(
    private http: HttpClient,
  ) { 
    this.testConnectivity()
  }

  private testConnectivity() {
    this.http.get<HttpResponse<any>>(environment.apiUrl).subscribe({
      next: _ => this.isApiOk = true,
      error: _ => this.isApiOk = false
    })
  }

  public get<T>({ id, url, page = 1, endpoint, name, title }: resolveParam) {
    if (url) return this.http.get<T>(environment.apiBaseUrl + url).pipe(toArray())
    else if (id) return this.http.get<T>(environment.apiUrl + endpoint + '/' + id).pipe(toArray())
    else return this.http.get<T[]>(environment.apiUrl + endpoint + `?page=${page}${name ? '&name=' + name : ''}${title ? '&title='+title : ''}`)
  }

  public post<T>({ endpoint }: resolveParam, body: Object) {
    return this.http.post<T>(environment.apiUrl + endpoint, body);
  }

  public patch<T>({ endpoint, id }: resolveParam, body: Object) {
    return this.http.patch<T>(environment.apiUrl + endpoint + '/' + id, body);
  }

  public resolveAlbum({ id, url, page }: resolveParam) {
    let data$: Observable<Album[]>;
    if (url) data$ = this.get<Album>({ url })
    else data$ = this.get<Album>({ endpoint: ApiEndpoint.ALBUM, id, page })

    return data$.pipe(
      map(albums => albums.map(album => ({
        ...album,
        url: slugify(album.title) + '-' + album.id,
        getArtist: (() => {
          let artist$: Observable<Artist>;
          return () => (artist$ ??= this.resolveArtist({ id: parseSlug(album.artist.id.toString()) }).pipe(map(artists => artists[0])), artist$)
        })(),
      })
      ))
    );
  }

  public resolveArtist({ id, url, page }: resolveParam) {
    let data$: Observable<Artist[]>;
    if (url) data$ = this.get<Artist>({ url })
    else data$ = this.get<Artist>({ endpoint: ApiEndpoint.ARTIST, id, page })

    return data$.pipe(
      map(artist => {
        return artist.map(artist => ({
          ...artist,
          url: slugify(artist.name) + '-' + artist.id,
          getAlbums: (() => {
            let albums$: Observable<Album[]>;
            return () => {
              albums$ ??= forkJoin<Album[]>(artist.albums.map(albumUrl => this.resolveAlbum({ url: albumUrl }).pipe(map((artists) => artists[0]))))
              return albums$
            }
          })(),

          getSongs: (() => {
            let songs$: Observable<Song[]>;
            return () => {
              songs$ ??= forkJoin<Song[]>(artist.songs.map(songUrl => this.resolveSong({ url: songUrl }).pipe(map((songs) => songs[0]))))
              return songs$
            }
          })()

        }));
      })
    );
  }

  public resolveSong({ id, url, page }: resolveParam) {
    let data$: Observable<Song[]>;

    if (url) data$ = this.get<Song>({ url })
    else data$ = this.get<Song>({ endpoint: ApiEndpoint.SONG, id, page })

    return data$.pipe(
      map(song => {
        return song.map(song => {
          song.getAlbum = (() => {
            let album: Observable<Album>;
            return () => {
              album ??= this.resolveAlbum({ url: song.album }).pipe(map((albums) => albums[0]))
              return album
            }
          })();

          song.getArtist = (() => {
            let artist: Observable<Artist>;
            return () => {
              artist ??= this.resolveArtist({ url: song.album }).pipe(map((artist) => artist[0]))
              return artist
            }
          })();

          return song
        });
      })
    );
  }

  public resolvePlaylist({ id }: resolveParam) {
    let data$ = this.get<Playlist>({ endpoint: ApiEndpoint.PLAYLIST, id })

    return data$.pipe(
      map(playlist => {
        return playlist.map(playlist => {

          playlist.url = slugify(playlist.name) + '-' + playlist.id
          playlist.image = playlist.image ?? 'https://api.dicebear.com/6.x/shapes/svg?seed=' + playlist.name + '&backgroundType=gradientLinear,solid&size=256'

          return playlist
        });
      })
    );
  }

  public search<T>(endpoint: ApiEndpoint, searchObject: SearchObject) {
    return this.get<T>({ endpoint, ...searchObject })
  }
}
