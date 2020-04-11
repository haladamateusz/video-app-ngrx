import {Component, EventEmitter, Input, Output} from '@angular/core';
import {VideoItem} from '../../interfaces/video-item';

@Component({
  selector: 'app-video-columns',
  templateUrl: './video-columns.component.html',
  styleUrls: ['./video-columns.component.scss']
})
export class VideoColumnsComponent {
  @Input() videoCollection: VideoItem[];
  @Output() delete = new EventEmitter<string>();
  @Output() changeFavorite = new EventEmitter<string>();
  constructor() {
  }

  deleteVideo(id: string) {
    this.delete.emit(id);
  }

  favoriteVideo(id: string) {
    this.changeFavorite.emit(id);
  }
}
