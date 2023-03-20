import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ApiEndpoint } from '@enums/api-endpoint.enum';
import { Album } from '@models/album.model';
import { ApiService } from '@services/api/api.service';
import { Artist } from '@src/app/models/artist.model';
import { environment } from '@src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlbumService extends ApiService {

  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  getArtist(id: number) {
    return this.httpClient.get<Artist>(environment.apiUrl + ApiEndpoint.ARTIST + '/' + id)
  }

  resolve(route: ActivatedRouteSnapshot) {
    return super.resolveAlbum(route);
  }
}
