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
  public firstSongsToShow!: Song[]; 

  public maxSongsToShow = 5;
  private nbSongsToShow!: number;

  public isShowMore: boolean = false;

  constructor(
    private likeService: LikeService,
  ) {}

  ngOnInit(){
    this.getSongs()
    this.getAlbums()
    this.firstSongsToShow = []
  }  

  getSongs() {
    const songsRequest = this.likeService.getAllLikedSong()
    if(songsRequest) songsRequest.subscribe(results => {this.songs = results.flat(); this.getLength(); this.getfirstSongsToShow()})
    else this.songs = []
  }

  getAlbums() {
    const songsRequest = this.likeService.getAllLikedAlbum()
    if(songsRequest) songsRequest.subscribe(results => this.albums = results.flat())
    else this.songs = []
  }

  getLength() {
    this.nbSongsToShow = this.songs?.length < this.maxSongsToShow ?  this.songs.length : this.maxSongsToShow;
  }
  
  getfirstSongsToShow() {
    this.firstSongsToShow = []
    for ( let i = 0; i < this.nbSongsToShow; i++ ) {
      this.firstSongsToShow?.push(this.songs[i])
    }
  }

  showMore() {
    this.nbSongsToShow = this.songs.length
    this.firstSongsToShow = this.songs
    this.isShowMore = true
  }
  
  showLess() {
    this.getLength()
    this.getfirstSongsToShow()
    this.isShowMore = false
  }
}
