import {videoActions, videoActionTypes} from './video.actions';
import {VideoItem} from '../interfaces/video-item';

export interface VideoState {
  videoItems: VideoItem[];
  videoItemsAll: VideoItem[];
  showColumns: boolean;
  showList: boolean;
  favorites: boolean;
  reverse: boolean;
  error?: string;
}

const initialState: VideoState = {
  videoItems: [],
  videoItemsAll: [],
  showColumns: true,
  showList: false,
  favorites: false,
  reverse: false
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
    case videoActionTypes.LoadExamplesSuccess:
      return {
        ...state
      };
    case videoActionTypes.LoadLocalStorageSuccess:
      return {
        ...state,
        videoItems: action.payload,
        videoItemsAll: action.payload
      };
    case videoActionTypes.ToggleFilter:
      const fav = !state.favorites;
      let currentVideos = [...state.videoItemsAll];
      if (fav) {
        currentVideos = state.videoItems.filter(video => video.favorite === true);
      }
      if (state.reverse) {
        currentVideos = currentVideos.reverse();
      }
      return {
        ...state,
        favorites: fav,
        videoItems: currentVideos
      };
    case videoActionTypes.ToggleSort:
      const reversedVideos = state.videoItems.slice().reverse();
      const reverse = !state.reverse;
      return {
        ...state,
        videoItems: reversedVideos,
        reverse
      };
    case videoActionTypes.DeleteAllVideos:
      return {
        ...state,
        videoItems: [],
        videoItemsAll: []
      };
    case videoActionTypes.DeleteVideoSuccess: {
      return {
        ...state,
        videoItems: state.favorites ?
          state.reverse ? action.payload.filter(video => video.favorite === true).reverse()
            : action.payload.filter(video => video.favorite === true)
          : state.reverse ? [...action.payload.slice().reverse()] : [...action.payload],
        videoItemsAll: action.payload
      };
    }
    case videoActionTypes.FavoriteVideoSuccess: {
      return {
        // dorobic wykrywanie czy jestesmy w ulubionyhc
        ...state,
        videoItems: state.favorites ?
          state.reverse ? action.payload.filter(video => video.favorite === true).reverse()
            : action.payload.filter(video => video.favorite === true)
          : state.reverse ? [...action.payload.slice().reverse()] : [...action.payload],
        videoItemsAll: [...action.payload]
      };
    } // s
    case videoActionTypes.AddVideoSuccess: {
      return {
        ...state,
        favorites: false,
        reverse: false,
        videoItems: action.payload,
        videoItemsAll: action.payload
      };
    }
    case videoActionTypes.AddVideoFail:
    case videoActionTypes.DeleteVideoFail:
    case videoActionTypes.FavoriteVideoFail:
    case videoActionTypes.LoadExamplesFail:
    case videoActionTypes.LoadLocalStorageFail: {
      console.log(state.error);
      return state;
    }
    default:
      return state;
  }
}


// kontrolka reverse
// snackbary
// sprawdzanie czy jest w bazie danych
// wyswietlanie errorow w consoli
// vimeo
// TODO: paginacja
// TODO: modal
