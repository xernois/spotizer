import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndpoint } from '@enums/api-endpoint.enum';
import { Song } from '@models/song.model';
import { ApiService } from '@services/api.service';

@Injectable({
  providedIn: 'root'
})
export class SongService extends ApiService<Song> {

  constructor(private httpClient: HttpClient) {
    super(httpClient, ApiEndpoint.SONG);
  }
}
