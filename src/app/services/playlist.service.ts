import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndpoint } from '../enums/api-endpoint.enum';
import { Playlist } from '../models/playlist.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService extends ApiService<Playlist> {

  constructor(private httpClient: HttpClient) {
    super(httpClient, ApiEndpoint.PLAYLIST);
  }

  override setDataAPI() {
    console.log('a faire avec le localstorage')
  }
}
