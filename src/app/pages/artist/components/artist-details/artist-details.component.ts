import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Album } from '@src/app/models/album.model';
import { Artist } from '@src/app/models/artist.model';
import { Song } from '@src/app/models/song.model';

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.scss']
})
export class ArtistDetailsComponent {
  artist !: Artist;
  songs !: Song[];
  albums !: Album[];

  constructor(
    private route: ActivatedRoute,
    private router : Router,
  ) {}

  async ngOnInit() {
    this.artist = this.route.snapshot.data['artist'][0]
    this.artist.getSongs().subscribe((songs) => this.songs = songs)
    this.artist.getAlbums().subscribe((albums) => this.albums = albums)
    if(!this.artist) this.router.navigateByUrl('/artist')
  }
}
