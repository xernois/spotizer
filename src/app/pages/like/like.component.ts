import { Component } from '@angular/core';
import { LikeService } from '@services/like.service';
import { Song } from '@models/song.model';
import { Album } from '@models/album.model';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss']
})
export class LikeComponent {

  public songs!: Song[]; 
  public albums!: Album[]; 

  constructor(
    private likeService: LikeService
  ) {}

  ngOnInit(){
    this.getSongs()
    this.getAlbums()
  }  

  getSongs() {
    const songsRequest = this.likeService.getAllLikedSong()
    if(songsRequest) songsRequest.subscribe(results => this.songs = results.flat())
    else this.songs = []
  }

  getAlbums() {
    const songsRequest = this.likeService.getAllLikedAlbum()
    if(songsRequest) songsRequest.subscribe(results => this.albums = results.flat())
    else this.songs = []
  }
}
