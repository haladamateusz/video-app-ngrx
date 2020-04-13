import {Component, OnInit, ViewChild} from '@angular/core';
import {VideoItem} from '@video/interfaces/video-item';
import * as fromVideo from '@video/state';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as videoActions from '@video/state/video.actions';
import {VideoRequestData} from '@video/interfaces/video-request-data';
import {MatDialog} from '@angular/material/dialog';
import {VideoModalComponent} from '@video/components/video-modal/video-modal.component';
import {VideoColumnsComponent} from '@video/components/video-columns/video-columns.component';
import {VideoListComponent} from '@video/components/video-list/video-list.component';

@Component({
  selector: 'app-video-shell',
  templateUrl: './video-shell.component.html'
})
export class VideoShellComponent implements OnInit {
  displayColumns$: Observable<boolean>;
  displayList$: Observable<boolean>;
  videoCollection$: Observable<VideoItem[]>;
  currentPage$: Observable<number>;
  itemsPerPage$: Observable<number>;
  @ViewChild('cols') cols: VideoColumnsComponent;
  @ViewChild('list') list: VideoListComponent;

  constructor(private store: Store<fromVideo.State>,
              protected dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.store.dispatch(new videoActions.LoadLocalStorage());
    this.displayColumns$ = this.store.pipe(select(fromVideo.getShowColumns));
    this.displayList$ = this.store.pipe(select(fromVideo.getShowList));
    this.videoCollection$ = this.store.pipe(select(fromVideo.getVideos));
    this.currentPage$ = this.store.pipe(select(fromVideo.getCurrentPage));
    this.itemsPerPage$ = this.store.pipe(select(fromVideo.getItemsPerPage));
  }

  loadExamples(): void {
    this.store.dispatch(new videoActions.LoadExamples());
    this.displayColumns$ = this.store.pipe(select(fromVideo.getShowColumns));
    this.displayList$ = this.store.pipe(select(fromVideo.getShowList));
    this.videoCollection$ = this.store.pipe(select(fromVideo.getVideos));
  }

  loadColumns(): void {
    this.store.dispatch(new videoActions.LoadColumns());
  }

  loadList(): void {
    this.store.dispatch(new videoActions.LoadList());
  }

  toggleFavorite(): void {
    this.store.dispatch(new videoActions.ToggleFilter());
    if (this.cols) {
      this.cols.ChangePageToFirst();
    }
    if (this.list) {
      this.list.ChangePageToFirst();
    }
  }

  toggleSort(): void {
    this.store.dispatch(new videoActions.ToggleSort());
  }

  deleteVideos(): void {
    this.store.dispatch(new videoActions.DeleteAllVideos());
  }

  deleteVideo(event: string): void {
    this.store.dispatch(new videoActions.DeleteVideo(event));
  }

  favoriteVideo(event: string): void {
    this.store.dispatch(new videoActions.FavoriteVideo(event));
  }

  addVideo(event: string): void {
    this.store.dispatch(new videoActions.AddVideo(event));
    if (this.cols) {
      this.cols.ChangePageToFirst();
    }
    if (this.list) {
      this.list.ChangePageToFirst();
    }
  }

  openModal(event: VideoRequestData): void {
    this.dialog.open(VideoModalComponent, {
      autoFocus: false,
      data: {
        event
      }
    });
  }
}
