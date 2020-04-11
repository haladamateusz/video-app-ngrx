import {Component, OnInit} from '@angular/core';
import {VideoItem} from '../../interfaces/video-item';
import {VideoService} from '../../video.service';
import * as fromVideo from '../../state';
import {Observable} from 'rxjs';
import {select, Store} from "@ngrx/store";
import * as videoActions from './../../state/video.actions';

@Component({
  selector: 'app-video-shell',
  templateUrl: './video-shell.component.html'
})
export class VideoShellComponent implements OnInit {
  displayColumns$: Observable<boolean>;
  displayList$: Observable<boolean>;
  videoCollection$: Observable<VideoItem[]>;
  constructor(private videoService: VideoService,
              private store: Store<fromVideo.State>) {
  }

  ngOnInit(): void {
    this.store.dispatch(new videoActions.LoadLocalStorage());
    this.displayColumns$ = this.store.pipe(select(fromVideo.getShowColumns));
    this.displayList$ = this.store.pipe(select(fromVideo.getShowList));
    this.videoCollection$ = this.store.pipe(select(fromVideo.getVideos));
  }

  loadExamples() {
    this.store.dispatch(new videoActions.LoadExamples());
    this.displayColumns$ = this.store.pipe(select(fromVideo.getShowColumns));
    this.displayList$ = this.store.pipe(select(fromVideo.getShowList));
    this.videoCollection$ = this.store.pipe(select(fromVideo.getVideos));
  }
  loadColumns() {
    this.store.dispatch(new videoActions.LoadColumns());
  }
  loadList() {
    this.store.dispatch(new videoActions.LoadList());
  }
  toggleFavorite() {
    this.store.dispatch(new videoActions.ToggleFilter());
  }
  toggleSort() {
    this.store.dispatch(new videoActions.ToggleSort());
  }
  deleteVideos() {
    this.store.dispatch(new videoActions.DeleteAllVideos());
  }
  deleteVideo(event: string) {
    this.store.dispatch(new videoActions.DeleteVideo(event));
  }
  favoriteVideo(event: string) {
    this.store.dispatch(new videoActions.FavoriteVideo(event));
  }
  addVideo(event: string) {
    this.store.dispatch(new videoActions.AddVideo(event));
  }
}
