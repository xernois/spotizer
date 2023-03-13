import { Component, OnInit } from '@angular/core';
import { Album } from '@models/album.model';
import { AlbumService } from '@services/api/album.service';
import { slugify } from '@src/app/functions/slug.function';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  albums: (Album & { url?: string })[] = []

  constructor(
    private albumService: AlbumService
  ) { }

  ngOnInit(): void {
    this.albums = this.albumService.getDataJS();
    this.albums = this.albums.map(album => {album.url = slugify(album.title)+'-'+album.id; return album})
  }
}
