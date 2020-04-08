import {Action} from '@ngrx/store';
import {VideoItem} from '../interfaces/video-item';

export enum videoActionTypes {
  InitLoad = '[Video] Load',
  LoadExamples = '[Video] Load Examples',
  LoadColumns = '[Video] Load Columns',
  LoadList = '[Video] Load List ',
  LoadLocalStorage = '[Video] Load Local Storage',
  ToggleFilter = '[Video] Toggle Filter',
  ToggleSort = '[Video] Toggle Sort',
  DeleteAllVideos = '[Video] Delete all videos'
}

export class InitLoad implements Action {
  readonly type = videoActionTypes.InitLoad;
}

export class LoadLocalStorage implements Action {
  readonly type = videoActionTypes.LoadLocalStorage;

  constructor(public payload: VideoItem[]) {
  }
}

export class LoadExamples implements Action {
  readonly type = videoActionTypes.LoadExamples;
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

export type videoActions = InitLoad
  | LoadLocalStorage
  | LoadColumns
  | LoadList
  | ToggleSort
  | ToggleFilter
  | DeleteAllVideos;
