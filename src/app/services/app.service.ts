import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { AlbumService } from '@services/api/album.service';
import { filter, firstValueFrom } from 'rxjs';
import { slugify } from '../functions/slug.function';
import { baseApiModel } from '../models/base.model';
import { Breadcrumb, Breadcrumbs } from '../models/breadcrumb.model';
import { ApiService } from './api/api.service';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  public initializing: boolean = true
  public breadcrumbs: Breadcrumbs = []


  constructor(
    private router: Router,
    private albumService: AlbumService,
  ) {
    this.initializeApiService(this.albumService)

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(async () => {
      this.breadcrumbs = await this.getBreadcrumbs(this.router.routerState.root);
    });
  }

  private async getBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumbs = []): Promise<Breadcrumbs> {

    const data: Record<string, unknown> = await firstValueFrom(route.data)

    let label = data['breadcrumb'] as string ?? '';
    let path = route?.routeConfig?.path ||  '';

    if (label.startsWith('@')) {
      const keys: string[] = label.replace('@', '').split('.')
      label = (data[keys[0]] as Record<string, string | undefined>)?.[keys[1]] || ''
      if (path.startsWith(':')) {
        const slug = slugify( label)
        if (slug) path = slug + '-' + (data[keys[0]] as Record<string, string | undefined>)['id']
      }
    }

    const nextUrl = `${url}${path}/`;

    if(label && !breadcrumbs.map(b => b.label).includes(label)) breadcrumbs.push({ label, url: nextUrl });

    if (route.firstChild) return this.getBreadcrumbs(route.firstChild, nextUrl, breadcrumbs);

    return breadcrumbs;
  }

  async initializeApiService(...services: ApiService<baseApiModel>[]) {
    await Promise.allSettled(services.map(service => service.setDataAPI()))
    this.initializing = false
  }

}
