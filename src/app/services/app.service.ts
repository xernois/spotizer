import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, firstValueFrom } from 'rxjs';
import { slugify } from '../functions/slug.function';
import { Breadcrumb } from '../models/breadcrumb.model';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  public breadcrumbs: Array<Breadcrumb | undefined> = []

  constructor(
    private router: Router,
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(async () => {
      this.breadcrumbs = await this.getBreadcrumbs(this.router.routerState.root);
    });
  }

  private async getBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Array<Breadcrumb> = []): Promise<Array<Breadcrumb>> {

    const data: Record<string, unknown> = await firstValueFrom(route.data)

    let label = data['breadcrumb'] as string ?? '';
    let path = route?.routeConfig?.path ||  '';

    if (label.startsWith('@')) {
      const keys: string[] = label.replace('@', '').split('.')
      label = (data[keys[0]] as Record<string, string | undefined>[])?.[0]?.[keys[1]] || ''
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
}
