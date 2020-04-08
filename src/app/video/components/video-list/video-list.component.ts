import {Component, Input} from '@angular/core';
import {VideoItem} from '../../interfaces/video-item';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent  {
  @Input() videoCollection: VideoItem[];
  constructor() { }


}
