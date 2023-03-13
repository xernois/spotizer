import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {

  path: string[] = []

  constructor(
    private router: Router
  ) {
    router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) this.path = event.url.split('/')
    })
  }

}
