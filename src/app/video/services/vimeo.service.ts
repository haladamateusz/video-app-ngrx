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
export class VimeoService {

  constructor(public http: HttpClient) {
  }

  getVimeoVideo(id: string): Observable<any> {
    const url = `https://api.vimeo.com/videos/${id}`;
    return this.http.get(url, {
      headers: {
        Authorization: environment.vimeoKey
      }
    });
  }


  createVimeoVideoObject(responseData): VideoItem {
    return {
      type: videoTypes.Vimeo,
      title: responseData.name,
      favorite: false,
      dateAdded: moment().format('YYYY-MM-DD HH:mm:ss'),
      id: responseData.uri.match(/\d+/g).toString(),
      views: null,
      likes: responseData.metadata.connections.likes.total,
      img: responseData.pictures.sizes[6].link
    };
  }

  vimeoGuard(url: string): string {
    const regExp = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
    const match = url.match(regExp);
    if (match && match[5] && (+match[5]) === parseInt(match[5], 10) && (!!(url.includes('vimeo')))) {
      return match[5];
    }
    return '';
  }
}
