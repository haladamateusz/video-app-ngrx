import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import * as fromVideos from './video.reducer';
import {VideoItem} from '../interfaces/video-item';


export interface State extends fromRoot.State {
  videos: fromVideos.VideoState;
}
const getVideoFeatureState = createFeatureSelector<fromVideos.VideoState>('videos');

export const getShowColumns = createSelector(
  getVideoFeatureState,
  state => state.showColumns
);

export const getShowList = createSelector(
  getVideoFeatureState,
  state => state.showList
);

export const getVideos = createSelector(
  getVideoFeatureState,
  state => state.videoItems
);

export const getCurrentPage = createSelector(
  getVideoFeatureState,
  state => state.currentPage
);

export const getItemsPerPage = createSelector(
  getVideoFeatureState,
  state => state.itemsPerPage
);

export function setLocalStorageVideos(videoItems: VideoItem[]): void {
  localStorage.setItem('videoItems', JSON.stringify({videoItems}));
}
