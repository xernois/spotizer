import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlaylistService } from '@services/api/playlist.service'
import { slugify } from '@src/app/functions/slug.function';
import { Playlist } from '@src/app/models/playlist.model';

@Component({
  selector: 'app-panel-user',
  templateUrl: './panel-user.component.html',
  styleUrls: ['./panel-user.component.scss']
})
export class PanelUserComponent {

  playlists: Playlist[] = [];

  constructor(
    private router: Router,
    private playlist: PlaylistService
  ){}

  ngOnInit(): void {
    this.playlist.getPlaylists().subscribe(playlists => this.playlists = playlists);
  }

  newPLaylist(){
    this.playlist.newPlaylist().subscribe(playlist => this.router.navigate(['/playlist', slugify(playlist.name) + '-' + playlist.id]));
  }
}
