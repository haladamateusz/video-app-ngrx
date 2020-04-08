import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import * as fromVideos from './video.reducer';


export interface State extends fromRoot.State {
  videos: fromVideos.VideoState;
}
const getProductFeatureState = createFeatureSelector<fromVideos.VideoState>('videos');

export const getShowColumns = createSelector(
  getProductFeatureState,
  state => state.showColumns
);

export const getShowList = createSelector(
  getProductFeatureState,
  state => state.showList
);

export const getVideos = createSelector(
  getProductFeatureState,
  state => state.videoItems
);
