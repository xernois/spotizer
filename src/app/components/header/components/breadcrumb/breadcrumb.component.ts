import { Component } from '@angular/core';
import { AppService } from '@src/app/services/app.service';
import { NavigationService } from '@src/app/services/navigation.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {

  prevUrl!: string;

  constructor(
    public appService: AppService,
    public navigationService: NavigationService
  ) { }

  async ngOnInit() {}
}
