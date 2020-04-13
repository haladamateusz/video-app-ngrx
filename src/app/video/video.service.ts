import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {VideoItem, } from './interfaces/video-item';
import {environment} from '@environment/environment';
import {HttpClient} from '@angular/common/http';
import {videoTypes} from './state/video.actions';
import * as moment from 'moment';
import {VideoRequestData} from './interfaces/video-request-data';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(public http: HttpClient) {
  }

  // -------------------------
  // function for API Requests
  // -------------------------

  getVideo(video: VideoRequestData): Observable<any> {
    let url;
    switch (video.type) {

      case videoTypes.Youtube:
        url =
          `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics
      &id=${video.id}&key=${environment.apiKey}`;
        return this.http.get(url);

      case videoTypes.Vimeo:
        url = `https://api.vimeo.com/videos/${video.id}`;
        return this.http.get(url, {
          headers: {
            Authorization: environment.vimeoKey
          }
        });
    }
  }


  // -------------------------
  // functions for working with LocalStorage
  // -------------------------


  addVideo(video: VideoItem): void {
    const VideoDatabase = this.getVideoItems();
    VideoDatabase.push(video);
    VideoDatabase.sort((a, b) => {
      const dateA = moment(a.dateAdded).format('YYYYMMDDHHmmss');
      const dateB = moment(b.dateAdded).format('YYYYMMDDHHmmss');
      // @ts-ignore
      return (dateB) - (dateA);
    });
    this.setLocalStorageVideos(VideoDatabase);
  }

  setLocalStorageVideos(videoItems: VideoItem[]): void {
    localStorage.setItem('videoItems', JSON.stringify({videoItems}));
  }

  removeVideoItems(): void {
    localStorage.removeItem('videoItems');
  }

  getVideoItems(): VideoItem[] {
    const localStorageItem = JSON.parse(localStorage.getItem('videoItems'));
    return localStorageItem == null ? [] : localStorageItem.videoItems;
  }

  // -------------------------
  // functions for creating objects with each type of video
  // -------------------------

  createObject(responseData, type: string): VideoItem {
    switch (type) {
      case videoTypes.Youtube:
        return this.createYoutubeVideoObject(responseData.items[0]);
      case videoTypes.Vimeo:
        console.log(responseData);
        return this.createVimeoVideoObject(responseData);
    }
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

  // -------------------------
  // Video type checker
  // -------------------------

  getVideoType(videoURL: string): VideoRequestData {
    let videoData: VideoRequestData = null;

    const vimeoLink = this.vimeoGuard(videoURL);
    if (vimeoLink) {
      videoData = {
        id: vimeoLink,
        type: videoTypes.Vimeo
      };
    }

    const youtubeId = !!(videoURL.length === 11);
    if (youtubeId) {
      videoData = {
        id: videoURL,
        type: videoTypes.Youtube
      };
    }

    const youtubeLink = this.youtubeLinkGuard(videoURL);
    if (youtubeLink) {
      videoData = {
        id: youtubeLink,
        type: videoTypes.Youtube
      };
    }
    return videoData;
  }

  // -------------------------
  // guards
  // -------------------------

  videoInDatabaseGuard(vidId: string) {
    const videoItems = this.getVideoItems() as VideoItem[];
    return videoItems.map((val) => val.id).indexOf(vidId);
  }

  youtubeLinkGuard(url: string): string {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11 && (!!(url.includes('youtube') || url.includes('youtu.be')))) {
      return match[2];
    }
  }

  vimeoGuard(url: string): string {
    const regExp = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
    const match = url.match(regExp);
    if (match && match[5] && (+match[5]) === parseInt(match[5], 10) && (!!(url.includes('vimeo')))) {
      return match[5];
    }
    return '';
  }


  // -------------------------
  // Hardcoded list of example videos
  // -------------------------

  getExampleLocalStorageUrls(): string[] {
    return [
      'eIho2S0ZahI',
      'PlGbgd4aVZo',
      '0tNY10tBXCo',
      'tuBsnLLyA-I',
      'm4m1XZUR8VU',
      'R1Qbr8T5b4g',
      'WIwZ4kZEiAY',
      '9zDDxhL8p2E',
      'YxDvTXP3KG8',
      '8ZKPy2IZqo8',
      'cOG5gg2bsfE',
      '1AqezhM8FzM',
      '5-xhpcgBMe4'
    ];

  }

}
