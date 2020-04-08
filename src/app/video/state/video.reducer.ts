import {videoActions, videoActionTypes} from './video.actions';
import {VideoItem} from '../interfaces/video-item';


export interface VideoState {
  videoItems: VideoItem[];
  videoItemsAll: VideoItem[];
  showColumns: boolean;
  showList: boolean;
  favorites: boolean;
  error?: string;
}

const initialState: VideoState = {
  videoItems: [],
  videoItemsAll: [],
  showColumns: true,
  showList: false,
  favorites: false,
};


export function reducer(state = initialState, action: videoActions) {

  switch (action.type) {
    case videoActionTypes.LoadColumns:
      return {
        ...state,
        showColumns: true,
        showList: false
      };
    case videoActionTypes.LoadList:
      return {
        ...state,
        showColumns: false,
        showList: true
      };
    case videoActionTypes.LoadLocalStorage:
      return {
        ...state,
        videoItems: action.payload,
        videoItemsAll: action.payload
      };
    case videoActionTypes.ToggleFilter:
      const fav = !state.favorites;
      return{
        ...state,
        favorites: fav,
        videoItems: fav ? state.videoItems.filter( video => video.favorite === true) : state.videoItemsAll,
      };
    case videoActionTypes.ToggleSort:
      const reversedVideos = state.videoItems.slice().reverse();
      return{
        ...state,
        videoItems: reversedVideos
      };

    case videoActionTypes.DeleteAllVideos:

      return{
        ...state,
        videoItems: [],
        videoItemsAll: []
      };
  }
}
