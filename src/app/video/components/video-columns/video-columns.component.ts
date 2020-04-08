import {Component, Input} from '@angular/core';
import {VideoItem} from '../../interfaces/video-item';

@Component({
  selector: 'app-video-columns',
  templateUrl: './video-columns.component.html',
  styleUrls: ['./video-columns.component.scss']
})
export class VideoColumnsComponent {
  @Input() videoCollection: VideoItem[];

  constructor() {
  }

}
