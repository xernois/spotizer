import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from '@src/app/services/player.service';
import { Album } from '@src/app/models/album.model';
import { Artist } from '@src/app/models/artist.model';
import { LikeService } from '@src/app/services/like.service';
import { Song } from '@src/app/models/song.model';
import { take } from 'rxjs';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailsComponent {

  album !: Album & {songs: (Song & {liked: Boolean})[]};
  artist !: Artist;


  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private router : Router,
    public like: LikeService
  ) {}

  async ngOnInit() {
    this.album = this.route.snapshot.data['album'][0]
    this.album.songs = this.album.songs.map((song: Song) => ({...song, liked: this.like.isSongLiked(song.id)}))
    this.album.getArtist().subscribe((artist) => this.artist = artist)
    if(!this.album) this.router.navigateByUrl('/album')
  }

  playAlbum() {
    this.playerService.musicQueue = [...this.album.songs]
    this.playerService.updateCurrentSong()
    this.playerService.playing$.next(true)
  } 
}
