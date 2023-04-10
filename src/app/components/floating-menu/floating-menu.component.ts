import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Playlist } from '@src/app/models/playlist.model';
import { Song } from '@src/app/models/song.model';
import { PlaylistService } from '@src/app/services/api/playlist.service';
import { PlayerService } from '@src/app/services/player.service';

@Component({
  selector: 'app-floating-menu',
  templateUrl: './floating-menu.component.html',
  styleUrls: ['./floating-menu.component.scss']
})

export class FloatingMenuComponent {
  @Input() isVisible!: boolean;
  @Input() song!: Song;
  @Output() onBlur = new EventEmitter<boolean>()

  playlists: Playlist[] = []

  public expanded: boolean = false;

  constructor(
    private playerService: PlayerService,
    private playlistService: PlaylistService
  ) { }

  ngOnInit() {
    this.playlistService.getPlaylists().subscribe(playlists => this.playlists = playlists)
  }

  addQueue() {
    this.playerService.musicQueue.push(this.song)
    this.playerService.playing$.next(true)
  }

  addToPlaylist(playlistId: number) {
    this.playlistService.addSongToPlaylist(playlistId, this.song.id).subscribe()
  }

  toggleVisibility() {
    this.onBlur.next(this.isVisible)
  }

  toggleExpanded() {
    this.expanded = !this.expanded
  }
}
