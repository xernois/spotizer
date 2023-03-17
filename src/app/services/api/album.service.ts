import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ApiEndpoint } from '@enums/api-endpoint.enum';
import { Album } from '@models/album.model';
import { ApiService } from '@services/api/api.service';
import { Artist } from '@src/app/models/artist.model';
import { environment } from '@src/environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumService extends ApiService<Album> {

  constructor(private httpClient: HttpClient) {
    super(httpClient, ApiEndpoint.ALBUM);
  }


  override async resolve(route: ActivatedRouteSnapshot) {
    const data = await super.resolve(route);
    await Promise.all(data.map(async album => {
      album.artist = await firstValueFrom(this.httpClient.get<Artist>(environment.apiUrl + ApiEndpoint.ARTIST + '/' + album.artist.id));
    }))
    return data;
  }
}
