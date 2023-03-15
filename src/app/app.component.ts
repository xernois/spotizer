import { Component } from '@angular/core';
import { AppService } from '@services/app.service';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'spotizer';

  constructor(
    public appService: AppService,
  ) {}
}
