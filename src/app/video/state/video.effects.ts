import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {VideoService} from '../video.service';
import {catchError, map, mapTo, mergeMap, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import * as videoActions from './video.actions';
import {videoActionTypes} from './video.actions';


@Injectable()
export class VideoEffects {


  constructor(private actions$: Actions,
              private videoService: VideoService) {
  }

  @Effect()
  initLoad$: Observable<Action>  = this.actions$.pipe(
    ofType(videoActionTypes.InitLoad),
      map(()  => {
        const VideoData = this.videoService.getDefaultLocalStorageVideos(); // TODO: z localstorage
        return new videoActions.LoadLocalStorage(VideoData);
      }) // dodac tu catch error
  );

  @Effect()
  exampleLoad$: Observable<Action>  = this.actions$.pipe(
    ofType(videoActionTypes.LoadExamples),
    map(()  => {
      const VideoData = this.videoService.getDefaultLocalStorageVideos();
      return new videoActions.LoadLocalStorage(VideoData);
    }) // dodac tu catch error
  );
}
