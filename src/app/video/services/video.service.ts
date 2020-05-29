import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {VideoItem, } from '../interfaces/video-item';
import {videoTypes} from '../state/video.actions';
import * as moment from 'moment';
import {VideoRequestData} from '../interfaces/video-request-data';
import {VimeoService} from '@video/services/vimeo.service';
import {YoutubeService} from '@video/services/youtube.service';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private vimeoService: VimeoService,
              private youtubeService: YoutubeService) {
  }

  // -------------------------
  // function for API Requests
  // -------------------------

  getVideo(video: VideoRequestData): Observable<any> {
    switch (video.type) {

      case videoTypes.Youtube:
        return this.youtubeService.getYoutubeVideo(video.id);

      case videoTypes.Vimeo:
        return this.vimeoService.getVimeoVideo(video.id);
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
  // function for creating objects with each type of video
  // -------------------------

  createObject(responseData, type: string): VideoItem {
    switch (type) {
      case videoTypes.Youtube:
        return this.youtubeService.createYoutubeVideoObject(responseData.items[0]);
      case videoTypes.Vimeo:
        return this.vimeoService.createVimeoVideoObject(responseData);
    }
  }




  // -------------------------
  // Video type checker
  // -------------------------

  getVideoType(videoURL: string): VideoRequestData {
    let videoData: VideoRequestData = null;

    const vimeoLink = this.vimeoService.vimeoGuard(videoURL);
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

    const youtubeLink = this.youtubeService.youtubeLinkGuard(videoURL);
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
