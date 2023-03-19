import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from '@models/album.model';
import { AlbumService } from '@services/api/album.service';
import { slugify } from '@src/app/functions/slug.function';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  albums!: (Album & {url: string})[]

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.albums = this.route.snapshot.data['albums']
    
    this.albums[0].getArtist().subscribe(console.log)
    
    this.albums = this.albums.map(album => {album.url = slugify(album.title)+'-'+album.id; return album})
  }
}
