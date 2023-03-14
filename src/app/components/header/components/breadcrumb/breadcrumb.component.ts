import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BreadcrumbService } from '@src/app/services/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {

  path: string[] = []

  constructor(
    public breadcrumbService: BreadcrumbService
  ) {}

}
