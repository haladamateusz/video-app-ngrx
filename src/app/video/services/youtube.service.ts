import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environment/environment';
import {Observable} from 'rxjs';
import {VideoItem} from '@video/interfaces/video-item';
import {videoTypes} from '@video/state/video.actions';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  constructor(public http: HttpClient) {
  }


  getYoutubeVideo(id: string): Observable<any> {
    const url =
      `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics
      &id=${id}&key=${environment.apiKey}`;
    return this.http.get(url);
  }

  createYoutubeVideoObject(responseData): VideoItem {
    return {
      type: videoTypes.Youtube,
      id: responseData.id,
      views: responseData.statistics.viewCount,
      likes: responseData.statistics.likeCount,
      img: responseData.snippet.thumbnails.maxres !== undefined ?
        responseData.snippet.thumbnails.maxres.url :
        responseData.snippet.thumbnails.standard !== undefined ?
          responseData.snippet.thumbnails.standard.url : responseData.snippet.thumbnails.high.url,
      dateAdded: moment().format('YYYY-MM-DD HH:mm:ss'),
      favorite: false,
      title: responseData.snippet.title
    };
  }

  youtubeLinkGuard(url: string): string {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11 && (!!(url.includes('youtube') || url.includes('youtu.be')))) {
      return match[2];
    }
  }
}
