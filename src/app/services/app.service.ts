import { Injectable } from '@angular/core';
import { AlbumService } from '@services/api/album.service';
import { ApiService } from './api/api.service';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  public initializing: boolean = true

  constructor(
    private albumService: AlbumService
  ) {
    this.initializeApiService(albumService)
  }

  async initializeApiService(...services: ApiService<unknown>[]) {
    await Promise.allSettled(services.map(service => service.setDataAPI()))
    this.initializing = false
  }

}
