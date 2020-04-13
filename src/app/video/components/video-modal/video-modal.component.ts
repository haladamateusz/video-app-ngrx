import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as Plyr from 'plyr';

@Component({
  selector: 'app-video-modal',
  templateUrl: './video-modal.component.html',
  styleUrls: ['./video-modal.component.scss']
})
export class VideoModalComponent {
  videoSources = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data) {
    this.videoSources.push({
      src: data.event.id,
      provider: data.event.type
    });
  }

  player: Plyr;

  play(): void {
    this.player.play();
  }

  pause(): void {
    this.player.pause();
  }

  stop(): void {
    this.player.stop();
  }

}
