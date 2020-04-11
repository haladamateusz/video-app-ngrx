import {Action} from '@ngrx/store';
import {VideoItem} from '../interfaces/video-item';

export enum videoTypes {
  Youtube = '[Type] Youtube',
  Vimeo = '[Type] Vimeo'
}

export enum videoActionTypes {
  InitLoad = '[Video] Load',
  LoadExamples = '[Video] Load Examples',
  LoadExamplesSuccess = '[Video] Load Examples Success',
  LoadExamplesFail = '[Video] Load Examples Failure',
  LoadColumns = '[Video] Load Columns',
  LoadList = '[Video] Load List ',
  LoadLocalStorage = '[Video] Load Local Storage',
  LoadLocalStorageSuccess = '[Video Load Local Storage Success',
  LoadLocalStorageFail = '[Video Load Local Storage Failure',
  ToggleFilter = '[Video] Toggle Filter',
  ToggleSort = '[Video] Toggle Sort',
  DeleteAllVideos = '[Video] Delete All Videos',
  DeleteVideo = '[Video] Delete Video',
  DeleteVideoSuccess = '[Video] Delete Video Success',
  DeleteVideoFail = '[Video] Delete Video Failure',
  FavoriteVideo = '[Video] Favorite Video',
  FavoriteVideoSuccess = '[Video] Favorite Video Success',
  FavoriteVideoFail = '[Video] Favorite Video Failure',
  AddVideo = '[Video] Add Video',
  AddVideoSuccess = '[Video] Add Video success',
  AddVideoFail = '[Video] Add Video Failure',
  VideoInDatabase = '[Video] Video currently in database'
}

export class InitLoad implements Action {
  readonly type = videoActionTypes.InitLoad;
}

export class LoadLocalStorage implements Action {
  readonly type = videoActionTypes.LoadLocalStorage;

  constructor() {
  }
}

export class LoadLocalStorageSuccess implements Action {
  readonly type = videoActionTypes.LoadLocalStorageSuccess;

  constructor(public payload: VideoItem[]) {
  }
}

export class LoadLocalStorageFail implements Action {
  readonly type = videoActionTypes.LoadLocalStorageFail;

  constructor(public payload: string) {
  }
}

export class LoadExamples implements Action {
  readonly type = videoActionTypes.LoadExamples;
}

export class LoadExamplesSuccess implements Action {
  readonly type = videoActionTypes.LoadExamplesSuccess;

  constructor(public payload: VideoItem[]) {
  }
}

export class LoadExamplesFail implements Action {
  readonly type = videoActionTypes.LoadExamplesFail;

  constructor(public payload: string) {
  }
}

export class LoadColumns implements Action {
  readonly type = videoActionTypes.LoadColumns;
}

export class LoadList implements Action {
  readonly type = videoActionTypes.LoadList;
}

export class ToggleSort implements Action {
  readonly type = videoActionTypes.ToggleSort;
}

export class ToggleFilter implements Action {
  readonly type = videoActionTypes.ToggleFilter;
}

export class DeleteAllVideos implements Action {
  readonly type = videoActionTypes.DeleteAllVideos;
}

export class DeleteVideo {
  readonly type = videoActionTypes.DeleteVideo;

  constructor(public payload: string) {
  }
}

export class DeleteVideoSuccess {
  readonly type = videoActionTypes.DeleteVideoSuccess;

  constructor(public payload: VideoItem[]) {
  }
}

export class DeleteVideoFail implements Action {
  readonly type = videoActionTypes.DeleteVideoFail;

  constructor(public payload: string) {
  }
}

export class FavoriteVideo {
  readonly type = videoActionTypes.FavoriteVideo;

  constructor(public payload: string) {
  }
}

export class FavoriteVideoSuccess {
  readonly type = videoActionTypes.FavoriteVideoSuccess;

  constructor(public payload: VideoItem[]) {
  }
}

export class FavoriteVideoFail implements Action {
  readonly type = videoActionTypes.FavoriteVideoFail;

  constructor(public payload: string) {
  }
}

export class AddVideo {
  readonly type = videoActionTypes.AddVideo;

  constructor(public payload: string) {
  }
}

export class AddVideoSuccess {
  readonly type = videoActionTypes.AddVideoSuccess;

  constructor(public payload: VideoItem[]) {
  }
}

export class AddVideoFail implements Action {
  readonly type = videoActionTypes.AddVideoFail;

  constructor(public payload: string) {
  }
}

export class VideoInDatabase implements Action {
  readonly type = videoActionTypes.VideoInDatabase;

  constructor() {
  }
}


export type videoActions = InitLoad
  | LoadExamples
  | LoadExamplesFail
  | LoadExamplesSuccess
  | LoadLocalStorage
  | LoadLocalStorageFail
  | LoadLocalStorageSuccess
  | LoadColumns
  | LoadList
  | ToggleSort
  | ToggleFilter
  | DeleteAllVideos
  | DeleteVideo
  | DeleteVideoFail
  | DeleteVideoSuccess
  | FavoriteVideo
  | FavoriteVideoFail
  | FavoriteVideoSuccess
  | AddVideo
  | AddVideoSuccess
  | AddVideoFail;

