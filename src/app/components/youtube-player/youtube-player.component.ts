import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

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

  @ViewChild('video') wrapper !: ElementRef;

  @Input() videoId: string = '';
  @Input() playing: boolean = false;
  @Input() volume: number = 50;

  player: any;

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
    }
    window.onYouTubeIframeAPIReady = () => {
      this.player = new (<any>window).YT.Player('player', {
        height: this.wrapper.nativeElement.getBoundingClientRect().height,
        width: this.wrapper.nativeElement.getBoundingClientRect().width,
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
    if (changes['volume'] && !isNaN(changes['volume'].currentValue)) this.player?.setVolume?.(changes['volume'].currentValue);
  }
}
