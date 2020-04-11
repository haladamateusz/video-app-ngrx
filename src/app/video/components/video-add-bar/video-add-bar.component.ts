import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-video-add-bar',
  templateUrl: './video-add-bar.component.html',
  styleUrls: ['./video-add-bar.component.scss']
})
export class VideoAddBarComponent {
  @Output() videoEmitter = new EventEmitter<string>();
  videoURL: string;

  constructor() {
  }

  addVideo() {
    this.videoEmitter.emit(this.videoURL);
  }
}
