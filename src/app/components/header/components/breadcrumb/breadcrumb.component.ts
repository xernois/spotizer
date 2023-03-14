import { Component } from '@angular/core';
import { ActivatedRoute, ActivationStart, NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { AppService } from '@src/app/services/app.service';
import { distinctUntilChanged, filter } from 'rxjs';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {

  constructor(
    public appService: AppService,
  ) { }

  async ngOnInit() {

  }
}
