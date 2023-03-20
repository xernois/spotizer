import { Component, ElementRef, EventEmitter, Input, AfterViewInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { PlayerService } from '@services/player.service';

declare global {
  interface Window {
    YT: {PlayerState: any};
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

@Component({
  selector: 'app-youtube-player',
  templateUrl: './youtube-player.component.html',
  styleUrls: ['./youtube-player.component.scss']
})
export class YoutubePlayerComponent implements AfterViewInit {

  @ViewChild('video') wrapper !: ElementRef;

  player: any;
  timerId: any;

  constructor(
    private playerService: PlayerService
  ) { }

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
        playerVars: { 'autoplay': 0, 'controls': 1 },
        videoId: null,
        events: {
          onReady: this.onPlayerReady.bind(this),
          onStateChange: this.onPlayerStateChange.bind(this)
        }
      });
    }
    
    this.playerService.playing$.subscribe((value) => {
      if(value) this.player?.playVideo?.() 
      else this.player?.pauseVideo?.()
    })

    this.playerService.volumeControl.valueChanges.subscribe((volume) => {
      this.player?.setVolume?.(volume)
    })
  }

  onPlayerReady() {
    this.player.cueVideoById?.(this.playerService.musicQueue[0].youtube.split('/').pop() || '')
  }

  onPlayerStateChange(event: any) {
    if (event.data == window.YT.PlayerState.PLAYING) {

      var playerTotalTime = this.player.getDuration();

      this.timerId = setInterval(() => {
        this.playerService.progressionControl.setValue((this.player.getCurrentTime() / playerTotalTime) * 100);
      }, 500);
    } else {
      clearTimeout(this.timerId);
    }
}

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['videoId']?.currentValue) this.player?.loadVideoById?.(changes['videoId'].currentValue);
  // }
}
