import {Component, EventEmitter, Input, Output} from '@angular/core';
import {VideoItem} from '@video/interfaces/video-item';
import {VideoRequestData} from '@video/interfaces/video-request-data';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent {
  @Input() videoCollection: VideoItem[];
  @Output() delete = new EventEmitter<string>();
  @Output() changeFavorite = new EventEmitter<string>();
  @Output() view = new EventEmitter<VideoRequestData>();
  @Input() itemsPerPage: number;
  @Input() currentPage: number;

  constructor() {
  }

  ChangePageToFirst() {
    this.currentPage = 1;
  }

  deleteVideo(id: string): void {
    this.delete.emit(id);
  }

  favoriteVideo(id: string): void {
    this.changeFavorite.emit(id);
  }

  viewVideo(id: string, type: string): void {
    this.view.emit({id, type});
  }

  onPageChange(page: number, el: HTMLElement): void {
    if (window.innerWidth < 767) {
      setTimeout(() => {
        el.scrollIntoView({behavior: 'smooth', block: 'start'});
      }, 50);
    }
    this.currentPage = page;
  }
}
