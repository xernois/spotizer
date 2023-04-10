import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from '@src/app/services/player.service';
import { Playlist } from '@src/app/models/playlist.model';
import { LikeService } from '@src/app/services/like.service';
import { AppUser } from '@src/app/models/app.model';
import { LocalStorageService } from '@src/app/services/local-storage.service';
import { parseSlug, slugify } from '@src/app/functions/slug.function';
import { PlaylistService } from '@src/app/services/api/playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent {

  playlist !: Playlist;
  user !: AppUser;

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private router: Router,
    private localStorage: LocalStorageService,
    public like: LikeService,
    private playlistService: PlaylistService,
    private activeRoute: ActivatedRoute
  ) { }

  async ngOnInit() {

    this.playlist = this.route.snapshot.data['playlist'][0]
    if (!this.playlist) this.router.navigateByUrl('/home')

    this.user = this.localStorage.getUser()

    this.activeRoute.params.subscribe(routeParams => {
      const id = parseSlug(routeParams['slug'])
      this.playlistService.getPlaylist(id).subscribe(playlist => {
        this.playlist = playlist
      })
    });
  }

  playPlaylist() {
    this.playerService.musicQueue = [...this.playlist.songs]
    this.playerService.updateCurrentSong()
    this.playerService.playing$.next(true)
  }

  deletePLaylist() {
    if(!window.confirm("Are you sure, you want to delete this playlist ?")) return 

    this.playlistService.deleteById(this.playlist.id)
    this.router.navigateByUrl('/home')
  }

  editPLaylist() {
    const prompt = window.prompt("What's your playlist new name ?", this.playlist.name)
    if(prompt && prompt?.trim() !== this.playlist.name.trim()) {
      this.playlistService.updateName(this.playlist.id, prompt).subscribe((x) => this.router.navigateByUrl('/playlist/'+slugify(x.name) + '-' + x.id))
    }
  }
}


