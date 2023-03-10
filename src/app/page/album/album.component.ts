import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/models/album.model';
import { AlbumService } from 'src/app/services/album.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  albums: Album[] = []

  constructor(
    private albumService: AlbumService
  ) { }

  ngOnInit(): void {
    this.albums = this.albumService.getDataJS()
  }
}
