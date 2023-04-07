import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from '@src/app/services/player.service';
import { Album } from '@src/app/models/album.model';
import { Playlist } from '@src/app/models/playlist.model';
import { LikeService } from '@src/app/services/like.service';
import { Song } from '@src/app/models/song.model';
import { take, tap } from 'rxjs';
import { AppUser } from '@src/app/models/app.model';
import { LocalStorageService } from '@src/app/services/local-storage.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent {

  playlist !: Playlist;
  songs !: Song[];
  user !: AppUser;

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private router : Router,
    private localStorage: LocalStorageService,
    public like: LikeService
  ) {}

  async ngOnInit() {
    this.playlist = this.route.snapshot.data['playlist'][0]
    if(!this.playlist) this.router.navigateByUrl('/home')
    this.playlist.getSong().subscribe(songs => this.songs = songs)

    this.user = this.localStorage.getUser()

  }

  playPlaylist() {
    if(this.songs) this.playerService.musicQueue = [...this.songs]
    this.playerService.updateCurrentSong()
    this.playerService.playing$.next(true)
  }
}


