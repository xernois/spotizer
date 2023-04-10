import { Component } from '@angular/core';
import { AppService } from '@services/app.service';
import { ApiService } from './services/api/api.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'spotizer';

  environment = environment

  constructor(
    public appService: AppService,
    public apiService: ApiService
  ) {}
 
  refresh() {
    window.location.reload()
  }
}
