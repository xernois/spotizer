import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndpoint } from '@enums/api-endpoint.enum';
import { Album } from '@models/album.model';
import { ApiService } from '@services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumService extends ApiService<Album> {

  constructor(private httpClient: HttpClient) {
    super(httpClient, ApiEndpoint.ALBUM);
  }
}
