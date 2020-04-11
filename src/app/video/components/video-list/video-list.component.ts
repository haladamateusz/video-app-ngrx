import {Component, EventEmitter, Input, Output} from '@angular/core';
import {VideoItem} from '../../interfaces/video-item';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent  {
  @Input() videoCollection: VideoItem[];
  @Output() delete = new EventEmitter<string>();
  @Output() changeFavorite = new EventEmitter<string>();
  constructor() { }

  deleteVideo(id: string) {
    this.delete.emit(id);
  }
  favoriteVideo(id: string) {
    this.changeFavorite.emit(id);
  }
}
