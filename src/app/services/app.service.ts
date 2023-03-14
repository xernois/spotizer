import { Injectable } from '@angular/core';
import { NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { AlbumService } from '@services/api/album.service';
import { filter, firstValueFrom } from 'rxjs';
import { slugify } from '../functions/slug.function';
import { ApiService } from './api/api.service';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  public initializing: boolean = true
  public breadcrumbs: { label: string, url: string }[] = []


  constructor(
    private router: Router,
    private albumService: AlbumService,
  ) {
    this.initializeApiService(this.albumService)

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(async () => {
      this.breadcrumbs = await this.buildBreadcrumbs(this.router.routerState.root);
    });
  }

  private async buildBreadcrumbs(route: any, url: string = '', breadcrumbs: { label: string, url: string }[] = []): Promise<{ label: string, url: string }[]> {

    const data: Record<string, any> = await firstValueFrom(route.data)

    let label = data['breadcrumb'] ?? '';
    let path = route.routeConfig ? route.routeConfig.path : '';

    if (label.startsWith('@')) {
      const keys: string[] = label.replace('@', '').split('.')
      label = data[keys[0]]?.[keys[1]]

      if (path.startsWith(':')) {
        const slug = slugify(data[keys[0]]?.[keys[1]] || '')
        if (slug) path = slug + '-' + data[keys[0]].id
      }
    }

    const nextUrl = `${url}${path}/`;

    if(label && !breadcrumbs.map(b => b.label).includes(label)) breadcrumbs.push({ label, url: nextUrl });

    if (route.firstChild) return this.buildBreadcrumbs(route.firstChild, nextUrl, breadcrumbs);

    //remove double
    return breadcrumbs;
  }

  async initializeApiService(...services: ApiService<any>[]) {
    await Promise.allSettled(services.map(service => service.setDataAPI()))
    this.initializing = false
  }

}
