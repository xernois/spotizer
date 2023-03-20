import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from '@models/album.model';
import { AlbumService } from '@services/api/album.service';
import { slugify } from '@src/app/functions/slug.function';
import { PlayerService } from '@src/app/services/player.service';
import { Observable, of } from 'rxjs';
import { Artist } from '@models/artist.model';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  albums!: (Album & { url: string })[];
  artist!: Observable<Artist>

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
  ) { }

  ngOnInit(): void {
    this.albums = this.route.snapshot.data['albums']

    this.albums = this.albums.map(album => { album.url = slugify(album.title) + '-' + album.id; return album })
  }

  playAlbum(album: Album) {
    this.playerService.musicQueue = album.songs
  }
}
