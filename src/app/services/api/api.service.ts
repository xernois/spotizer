import { HttpClient } from '@angular/common/http';
import { ApiEndpoint } from '@enums/api-endpoint.enum';
import { delay, map, Observable, toArray } from 'rxjs';
import { environment } from '@environments/environment';
import { ActivatedRouteSnapshot } from '@angular/router';
import { parseSlug } from '@src/app/functions/slug.function';
import { Album } from '@src/app/models/album.model';
import { Artist } from '@src/app/models/artist.model';
import { Song } from '@src/app/models/song.model'

export abstract class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  getData<T>(endpoint: ApiEndpoint, id?: number) {
    if(id) {
      return this.http.get<T>(environment.apiUrl + endpoint + '/' + id).pipe(toArray())
    } else {
      return this.http.get<T[]>(environment.apiUrl + endpoint)
    }
  }

  getAlbums(id?: number) {
    return this.getData<Album>(ApiEndpoint.ALBUM, id)
  }

  getSongs(id?: number) {
    return this.getData<Song>(ApiEndpoint.SONG, id)
  }

  getArtists(id?: number) {
    return this.getData<Artist>(ApiEndpoint.ARTIST, id)
  }

  resolveAlbum(route: ActivatedRouteSnapshot) {
    const slug = route.params['slug']
    const data$ = this.getAlbums(slug ? parseSlug(slug) : undefined)

    return data$.pipe(
      map(albums => {
        return albums.map(album => {
          album.getArtist = (() => {
            let artist: Observable<Artist>;
            return () => {
              if(!artist) artist = this.getArtists(parseSlug(album.artist.id.toString())).pipe(delay(500),map(artists => artists[0]))
              return artist
            }
          })();
          return album
        });
      })
    );
  }
}
