import { Component } from '@angular/core';
import { LocalStorageService } from '@src/app/services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  user;

  constructor(
    public localStorageService: LocalStorageService
  ) {
    this.user = this.localStorageService.getUser()
  }

}
