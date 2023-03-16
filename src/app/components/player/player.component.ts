import { Component, OnInit } from '@angular/core';
import { PlayerState } from '@src/app/enums/player.enum';
import { PlayerService } from '@src/app/services/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  apiLoaded = false;
  videoId = 'QIZ9aZD6vs0';
  player: any;
  done = false;

  constructor(
    public playerService: PlayerService
  ) { }

  ngOnInit(): void {
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;


      (<any>window).onYouTubeIframeAPIReady = () => {
        this.player = new (<any>window).YT.Player('player', {
          height: '300',
          width: '300',
          playerVars: { 'autoplay': 0, 'controls': 1 },
          videoId: this.playerService.musicQueue[0].youtube.split('/').pop(),
          events: {
            onReady: this.onPlayerReady.bind(this),
            onStateChange: this.onPlayerStateChange.bind(this)
          }
        });
      }

    }
  }

  onPlayerReady(event:any) {
    event.target.playVideo();
  }

  onPlayerStateChange(event: any) {
    if (event.data == (<any>window).YT.PlayerState.PLAYING) {
      console.log('playing');
    }
  }

  toggleClick() {
    if (this.playerService.state === PlayerState.PLAYING) {
      this.player.pauseVideo();
      this.playerService.pauseMusic();
    } else {
      this.player.playVideo();
      this.playerService.playMusic();
    }
  }
}
