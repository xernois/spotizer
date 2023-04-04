import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from '@src/app/services/player.service';
import { Album } from '@src/app/models/album.model';
import { Artist } from '@src/app/models/artist.model';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailsComponent {

  album !: Album
  artist !: Artist

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private router : Router
  ) {}

  async ngOnInit() {
    this.album = this.route.snapshot.data['album'][0]
    this.album.getArtist().subscribe((artist) => this.artist = artist)
    if(!this.album) this.router.navigateByUrl('/album')
  }

  playSong(id: number) {
    this.playerService.musicQueue = [...this.album.songs]
    for (let i = 0; i< id; i++) {
      this.playerService.nextSong()
    }
    this.playerService.updateCurrentSong()
    this.playerService.playing$.next(true)
  }
}
