import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter, map, Observable } from 'rxjs';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  public items$: Observable<BreadcrumbItem[]>;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.items$ = this._router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged(),
      map(_ => this._buildBreadCrumb(this._route.root))
    );
  }

  private _buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: BreadcrumbItem[] = []): BreadcrumbItem[] {
    const newBreadcrumbs = [...breadcrumbs];
    const path = route.snapshot.url.map(segment => segment.path).join('/');
    const nextUrl = `${url}/${path}`.replace('//', '/');

    if (route.routeConfig && route.routeConfig.data && route.routeConfig.data['breadcrumb']) {
      route.routeConfig.data['breadcrumb']?.forEach((breadcrumb: string) => {
        let data = breadcrumb

        if (data[0] === '@') {
          data.split('.').forEach((level: string, index: number) => {
            if (index === 0) data = route.snapshot.data[level.slice(1)];
            else data = !data ? null : (data as any)[level];
          });
        }

        newBreadcrumbs.push({
          label: data,
          path: nextUrl
        });

      });
    }
    return newBreadcrumbs;
  }
}
