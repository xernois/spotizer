import { Component } from '@angular/core';
import { LikeService } from '@services/like.service';
import {Song} from "@models/song.model";
import {ApiService} from "@services/api/api.service";
import {Album} from "@models/album.model";
import {Artist} from "@models/artist.model";
import {PlaylistService} from "@services/api/playlist.service";
import {Playlist} from "@models/playlist.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public songsLike!: Song[];
  private songs! : Song[];
  public topSong !: Song[];
  public newSong !: Song[];

  private albums! : Album[];
  public topAlbum !: Album;
  public newAlbum !: Album;

  private artists! : Artist[];
  public topArtist !: Artist;
  public newArtist !: Artist;

  public playlist !: Playlist[];

  constructor(
    private likeService: LikeService,
    private apiService: ApiService,
    private playlistService: PlaylistService
  ) {}

  ngOnInit(){
    this.getSongsLike()
    this.getSongs()
    this.getAlbums()
    this.getArtists()
    this.getPlaylists()
  }

  getSongsLike() {
    const songsRequest = this.likeService.getAllLikedSong()
    if(songsRequest) songsRequest.subscribe(results => this.songsLike = results)
  }

  getSongs() {
    this.apiService.resolveSong({}).subscribe(songs => {
      this.songs = songs;
      this.getTopSong();
      this.getNewSong();
    })
  }

  getAlbums() {
    this.apiService.resolveAlbum({}).subscribe(albums => {
      this.albums = albums;
      this.getTopAlbum();
      this.getNewAlbum();
    })
  }

  getArtists() {
    this.apiService.resolveArtist({}).subscribe(artists => {
      this.artists = artists;
      this.getTopArtist();
      this.getNewArtist()
    })
  }

  getTopSong() {
    this.topSong = this.songs.splice(Math.floor(Math.random()*(this.songs.length-3)),3)
  }

  getNewSong() {
    this.newSong = this.songs.splice(Math.floor(Math.random()*(this.songs.length-3)),3)
  }

  getTopAlbum() {
    this.topAlbum = this.albums[Math.floor(Math.random()*this.albums.length)]
  }

  getNewAlbum() {
    this.newAlbum = this.albums[Math.floor(Math.random()*this.albums.length)]
  }

  getTopArtist() {
    this.topArtist = this.artists[Math.floor(Math.random()*this.artists.length)]
  }

  getNewArtist() {
    this.newArtist = this.artists[Math.floor(Math.random()*this.artists.length)]
  }

  getPlaylists() {
    this.playlistService.getPlaylists().subscribe(playlist => {
      this.playlist = playlist
    })
  }
}
