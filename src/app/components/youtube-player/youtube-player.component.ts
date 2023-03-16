import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

declare global {
  interface Window {
    YT: unknown;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

@Component({
  selector: 'app-youtube-player',
  templateUrl: './youtube-player.component.html',
  styleUrls: ['./youtube-player.component.scss']
})
export class YoutubePlayerComponent implements OnInit {

  @Input() videoId: string = '';
  @Input() playing: boolean = false;

  player: any;

  constructor() { }

  ngOnInit(): void {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
    }
    window.onYouTubeIframeAPIReady = () => {
      this.player = new (<any>window).YT.Player('player', {
        height: '300',
        width: '300',
        playerVars: { 'autoplay': 0, 'controls': 0 },
        videoId: null,
        events: {
          onReady: () => {
            this.player.cueVideoById?.(this.videoId)
          }
        }
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['videoId']?.currentValue) this.player?.loadVideoById?.(changes['videoId'].currentValue);
    if (changes['playing']) changes['playing'].currentValue ? this.player?.playVideo?.() : this.player?.pauseVideo?.();
  }
}
