import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { parseSlug } from '../functions/slug.function';
import { ApiService } from '../services/api/api.service';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumResolver {
  constructor(private apiService: ApiService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot) {
    const slug = route.params['slug'];
    return this.apiService.resolveAlbum({id: slug ? parseSlug(slug) : undefined}).pipe(catchError((error) => this.router.navigate(['/album'])));
  }
}
