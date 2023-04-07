import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { parseSlug } from '../functions/slug.function';
import { ApiService } from '../services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistResolver {
  constructor(private apiService: ApiService) { }

  resolve(route: ActivatedRouteSnapshot) {
    const slug = route.params['slug'];
    return this.apiService.resolvePlaylist({id: slug ? parseSlug(slug) : undefined});
  }
}
