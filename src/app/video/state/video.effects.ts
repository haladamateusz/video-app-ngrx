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
      const VideoData = this.videoService.getVideoItems(); // TODO: z localstorage
      return new videoActions.LoadLocalStorageSuccess(VideoData);
    }),
    catchError(err => of(new videoActions.LoadLocalStorageFail(err)))// dodac tu catch error
  );

  @Effect()
  DeleteVideo$: Observable<Action> = this.actions$.pipe(
    ofType(videoActionTypes.DeleteVideo),
    map((test: videoActions.DeleteVideo) => {
      const VideoData = this.videoService.getVideoItems().filter(video => video.title !== test.payload); // TODO: z localstorage
      this.videoService.setLocalStorageVideos(VideoData);
      this.snackbar.open('Successfully deleted video', '', {panelClass: 'toast-success'});
      return new videoActions.DeleteVideoSuccess(VideoData);
    }) // dodac tu catch error
  );

  @Effect()
  exampleLoadVideo$: Observable<Action> = this.actions$.pipe(
    ofType(videoActionTypes.LoadExamples),
    map((action: videoActions.AddVideo) => action.payload),
    mergeMap(() => {
      const defaultIds = this.videoService.getExampleLocalStorageUrls();
      const defaultIds2 = defaultIds.toString().split(',').join('%2C');
      return this.videoService.getYoutubeVideo(defaultIds2).pipe(
        map((newVideos) => {
          for (const newVideo of newVideos.items) {
            const videoObject = this.videoService.createYoutubeVideoObject(newVideo, videoTypes.Youtube);
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
        switch (video.type) {
          case videoTypes.Youtube:
            return this.videoService.getYoutubeVideo(video.payload).pipe(
              map((newVideo) => {
                const videoObject = this.videoService.createYoutubeVideoObject(newVideo.items[0], videoTypes.Youtube);
                const notInDatabaseGuard = !!this.videoService.videoInDatabase(videoObject.id);
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
          case videoTypes.Vimeo:
            return this.videoService.getVimeoVideo(video.payload).pipe(
              map((newVideo) => {
                console.log(newVideo);
                const videoObject = this.videoService.createVimeoVideoObject(newVideo, videoTypes.Vimeo);
                console.log(videoObject);
                const notInDatabaseGuard = !!this.videoService.videoInDatabase(videoObject.id);
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
      }
    )
  );

  @Effect()
  updateVideo$: Observable<Action> = this.actions$.pipe(
    ofType(videoActions.videoActionTypes.FavoriteVideo),
    map((action: videoActions.FavoriteVideo) => {
      const videoItems = this.videoService.getVideoItems();
      console.log(videoItems);
      console.log(action.payload);
      const index = videoItems.map((val) => val.id).indexOf(action.payload);
      console.log(index);
      videoItems[index].favorite = !videoItems[index].favorite;
      this.videoService.setLocalStorageVideos(videoItems);
      return new videoActions.FavoriteVideoSuccess(videoItems);
    }),
    catchError(err => of(new videoActions.FavoriteVideoFail(err)))
  );


}
