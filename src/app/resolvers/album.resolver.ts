import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { delay } from 'rxjs';
import { parseSlug } from '../functions/slug.function';
import { ApiService } from '../services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumResolver {
  constructor(private apiService: ApiService) { }

  resolve(route: ActivatedRouteSnapshot) {
    const slug = route.params['slug'];
    return this.apiService.resolveAlbum({id: slug ? parseSlug(slug) : undefined});
  }
}
