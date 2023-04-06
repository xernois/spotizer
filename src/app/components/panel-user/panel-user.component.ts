import { Component } from '@angular/core';
import { PlaylistService } from '@services/api/playlist.service'

@Component({
  selector: 'app-panel-user',
  templateUrl: './panel-user.component.html',
  styleUrls: ['./panel-user.component.scss']
})
export class PanelUserComponent {

  constructor(
    private playlist: PlaylistService
  ){}

  newPLaylist(){
    this.playlist.newPlaylist().subscribe(console.log)
  }
}
