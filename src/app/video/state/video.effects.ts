import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {VideoService} from '../video.service';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import * as videoActions from './video.actions';
import {videoActionTypes, videoTypes} from './video.actions';
import {MatSnackBar} from '@angular/material/snack-bar';


@Injectable()
export class VideoEffects {


  constructor(private actions$: Actions,
              private videoService: VideoService,
              private snackbar: MatSnackBar) {
  }

  @Effect()
  initLoad$: Observable<Action> = this.actions$.pipe(
    ofType(videoActionTypes.LoadLocalStorage),
    map(() => {
      const VideoData = this.videoService.getVideoItems();
      return new videoActions.LoadLocalStorageSuccess(VideoData);
    }),
    catchError(err => of(new videoActions.LoadLocalStorageFail(err)))
  );

  @Effect()
  deleteAllVideos$: Observable<Action> = this.actions$.pipe(
    ofType(videoActionTypes.DeleteAllVideos),
    map(() => {
      this.videoService.removeVideoItems();
      this.snackbar.open('Successfully deleted all videos', '', {panelClass: 'toast-success'});
      return new videoActions.DeleteAllVideosSuccess();
    }),
    catchError(err => of(new videoActions.DeleteAllVideosFail(err)))
  );

  @Effect()
  DeleteVideo$: Observable<Action> = this.actions$.pipe(
    ofType(videoActionTypes.DeleteVideo),
    map((test: videoActions.DeleteVideo) => {
      const VideoData = this.videoService.getVideoItems().filter(video => video.title !== test.payload);
      this.videoService.setLocalStorageVideos(VideoData);
      this.snackbar.open('Successfully deleted video', '', {panelClass: 'toast-success'});
      return new videoActions.DeleteVideoSuccess(VideoData);
    }),
    catchError(err => of(new videoActions.DeleteVideoFail(err)))
  );

  @Effect()
  exampleLoadVideo$: Observable<Action> = this.actions$.pipe(
    ofType(videoActionTypes.LoadExamples),
    map((action: videoActions.AddVideo) => action.payload),
    mergeMap(() => {
      const defaultIds = this.videoService.getExampleLocalStorageUrls();
      const defaultVideoItem = {
        id: defaultIds.toString().split(',').join('%2C'),
        type: videoTypes.Youtube
      };
      return this.videoService.getVideo(defaultVideoItem).pipe(
        map((newVideos) => {
          for (const newVideo of newVideos.items) {
            const videoObject = this.videoService.createYoutubeVideoObject(newVideo);
            this.videoService.addVideo(videoObject);
          }
          const videoData = this.videoService.getVideoItems();
          this.snackbar.open('Successfully loaded examples', '', {panelClass: 'toast-success'});
          return new videoActions.LoadExamplesSuccess(videoData);
        }),
        catchError(err => of(new videoActions.LoadExamplesFail(err)))
      );
    }));


  @Effect()
  addVideo$: Observable<Action> = this.actions$.pipe(
    ofType(videoActionTypes.AddVideo),
    map((action: videoActions.AddVideo) => action.payload),
    mergeMap((product: string) => {
        const video = this.videoService.getVideoType(product);
        return this.videoService.getVideo(video).pipe(
          map((newVideo) => {
            const videoObject = this.videoService.createObject(newVideo, video.type);
            const notInDatabaseGuard = !!this.videoService.videoInDatabaseGuard(videoObject.id);
            if (notInDatabaseGuard) {
              this.videoService.addVideo(videoObject);
              const videoData = this.videoService.getVideoItems();
              this.snackbar.open('Successfully added video', '', {panelClass: 'toast-success'});
              return new videoActions.AddVideoSuccess(videoData);
            }
            this.snackbar.open('Video is already in database', '', {panelClass: 'toast-failure'});
            return new videoActions.VideoInDatabase();

          }),
          catchError(err => of(new videoActions.AddVideoFail(err)))
        );
      }
    )
  );

  @Effect()
  updateVideo$: Observable<Action> = this.actions$.pipe(
    ofType(videoActions.videoActionTypes.FavoriteVideo),
    map((action: videoActions.FavoriteVideo) => {
      const videoItems = this.videoService.getVideoItems();
      const index = videoItems.map((val) => val.id).indexOf(action.payload);
      videoItems[index].favorite = !videoItems[index].favorite;
      this.videoService.setLocalStorageVideos(videoItems);
      return new videoActions.FavoriteVideoSuccess(videoItems);
    }),
    catchError(err => of(new videoActions.FavoriteVideoFail(err)))
  );


}
