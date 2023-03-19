import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ApiEndpoint } from '@enums/api-endpoint.enum';
import { Album } from '@models/album.model';
import { ApiService } from '@services/api/api.service';
import { Artist } from '@src/app/models/artist.model';
import { environment } from '@src/environments/environment';
import { firstValueFrom, map, of, tap, toArray, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumService extends ApiService<Album> {

  constructor(private httpClient: HttpClient) {
    super(httpClient, ApiEndpoint.ALBUM);
  }

  getArtist(id: number) {
    return this.httpClient.get<Artist>(environment.apiUrl + ApiEndpoint.ARTIST + '/' + id)
  }

  override resolve(route: ActivatedRouteSnapshot) {
    const data$ = super.resolve(route);
    data$.subscribe(console.log)
    return data$.pipe(
      map(albums => {
        return albums.map(album => {
          album.getArtist = (() => {
            let artist: Observable<Artist>; 
            return () => {
              if(!artist) artist = this.getArtist(album.artist.id)
              return artist
            }
          })();
          return album
        });
      })
    );
  }
}