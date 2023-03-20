import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ArtistService extends ApiService {

  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }
}
