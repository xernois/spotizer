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
  public featuresSong !: Song[];

  public albums! : Album[];
  public featureAlbum !: Album;

  public artists! : Artist[];
  public featureArtist !: Artist;

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
    if(songsRequest) songsRequest?.subscribe(results => this.songsLike = results)
    else this.songsLike = []
  }

  getSongs() {
    this.apiService.resolveSong({}).subscribe(songs => {
      this.songs = songs;
      this.getfeatureSong();
    })
  }

  getAlbums() {
    this.apiService.resolveAlbum({}).subscribe(albums => {
      this.albums = albums;
      this.getfeatureAlbum();
    })
  }

  getArtists() {
    this.apiService.resolveArtist({}).subscribe(artists => {
      this.artists = artists;
      this.getfeatureArtist()
    })
  }

  getfeatureSong() {
    this.featuresSong = this.songs.splice(Math.floor(Math.random()*(this.songs.length-3)), 3)
  }

  getfeatureAlbum() {
    this.featureAlbum = this.albums[Math.floor(Math.random()*this.albums.length)]
  }

  getfeatureArtist() {
    this.featureArtist = this.artists[Math.floor(Math.random()*this.artists.length)]
  }

  getPlaylists() {
    this.playlistService.getPlaylists().subscribe(playlist => {
      this.playlist = playlist
    })
  }
}
