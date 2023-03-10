import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndpoint } from '../enums/api-endpoint.enum';
import { Artist } from '../models/artist.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ArtistService extends ApiService<Artist> {

  constructor(private httpClient: HttpClient) {
    super(httpClient, ApiEndpoint.ARTIST);
  }
}
