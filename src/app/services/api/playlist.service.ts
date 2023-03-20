import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndpoint } from '@enums/api-endpoint.enum';
import { Playlist } from '@models/playlist.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService extends ApiService {

  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

}
