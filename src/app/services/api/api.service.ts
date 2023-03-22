import { HttpClient } from '@angular/common/http';
import { ApiEndpoint } from '@enums/api-endpoint.enum';
import { delay, map, Observable, toArray } from 'rxjs';
import { environment } from '@environments/environment';
import { ActivatedRouteSnapshot } from '@angular/router';
import { parseSlug } from '@src/app/functions/slug.function';
import { Album } from '@src/app/models/album.model';
import { Artist } from '@src/app/models/artist.model';

export abstract class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  getData<T>(endpoint: ApiEndpoint, slug: string) {
    if(slug) {
      return this.http.get<T>(environment.apiUrl + endpoint + '/' + parseSlug(slug)).pipe(toArray())
    } else {
      return this.http.get<T[]>(environment.apiUrl + endpoint)
    }
  }

  getAlbums(slug: string) {
    return this.getData<Album>(ApiEndpoint.ALBUM, slug)
  }

  getArtists(slug: string) {
    return this.getData<Artist>(ApiEndpoint.ARTIST, slug)
  }


  resolveAlbum(route: ActivatedRouteSnapshot) {
    const data$ = this.getAlbums(route.params['slug'])

    return data$.pipe(
      map(albums => {
        return albums.map(album => {
          album.getArtist = (() => {
            let artist: Observable<Artist>;
            return () => {
              if(!artist) artist = this.getArtists(album.artist.id.toString()).pipe(delay(500),map(artists => artists[0]))
              return artist
            }
          })();
          return album
        });
      })
    );
  }
}
