import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-video-navbar',
  templateUrl: './video-navbar.component.html',
  styleUrls: ['./video-navbar.component.scss']
})
export class VideoNavbarComponent {
  @Output() examples = new EventEmitter<void>();
  @Output() columns = new EventEmitter<void>();
  @Output() list = new EventEmitter<void>();
  @Output() favorite = new EventEmitter<void>();
  @Output() sort = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  constructor() {
  }


  loadExamples(): void {
    this.examples.emit();
  }

  loadColumns(): void {
    this.columns.emit();
  }

  loadList(): void {
    this.list.emit();
  }

  toggleFavorite(): void {
    this.favorite.emit();
  }

  toggleSort(): void {
    this.sort.emit();
  }

  deleteVideos(): void {
    this.delete.emit();
  }
}
