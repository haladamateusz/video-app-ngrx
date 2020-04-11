import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {VideoItem} from './interfaces/video-item';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {videoTypes} from './state/video.actions';
import * as moment from 'moment';

interface VideoType {
  payload: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(public http: HttpClient) {
  }

// tslint:disable-next-line:max-line-length
// https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc%2Cc0KYU2j0TM4&key=AIzaSyCBsXCl90xtQnDAJfhzmUR5L6KQhwrU79w
// tslint:disable-next-line:max-line-length
// https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc%2Cc0KYU2j0TM4%2CeIho2S0ZahI&key=AIzaSyCBsXCl90xtQnDAJfhzmUR5L6KQhwrU79w
  getYoutubeVideo(id: string): Observable<any> {
    const url =
      `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics
      &id=${id}&key=${environment.apiKey}`;
    // const test_multiple_ids = 'Ks-_Mh1QhMc%2Cc0KYU2j0TM4%2CeIho2S0ZahI';
    return this.http.get(url);
  }

  getVimeoVideo(id: string): Observable<any> {
    const url = `https://api.vimeo.com/videos/${id}`;
    return this.http.get(url, {
      headers: {
        // tslint:disable-next-line
        'Authorization': environment.vimeoKey
      }
    });
  }

  getVideoType(videoURL): any {
    let videoData: VideoType = null;
    const youtubeId = !!(videoURL.length === 11);
    if (youtubeId) {
      videoData = {
        payload: videoURL,
        type: videoTypes.Youtube
      };
    }
    const youtubeLink = this.youtubeLinkGuard(videoURL);
    if (youtubeLink) {
      videoData = {
        payload: youtubeLink,
        type: videoTypes.Youtube
      };
    }
    const vimeoLink = this.vimeoGuard(videoURL);
    if (vimeoLink) {
      videoData = {
        payload: vimeoLink,
        type: videoTypes.Vimeo
      };
    }

    return videoData;

  }

  youtubeLinkGuard(url: string): string {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11 && (!!(url.includes('youtube') || url.includes('youtu.be')))) {
      return match[2];
    }
  }

  vimeoGuard(url: string) {
    const regExp = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
    const match = url.match(regExp);
    if (match && match[5] && (+match[5]) === parseInt(match[5], 10) && (!!(url.includes('vimeo')))) {
      return match[5];
    }
    return '';
  }

  createYoutubeVideoObject(responseData, type): VideoItem {
    return {
      type,
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

  createVimeoVideoObject(responseData, type): VideoItem {
    return {
      type,
      title: responseData.name,
      favorite: false,
      dateAdded: moment().format('YYYY-MM-DD HH:mm:ss'),
      id: responseData.uri.match(/\d+/g).toString(),
      views: null,
      likes: responseData.metadata.connections.likes.total,
      img: responseData.pictures.sizes[6].link
    };
  }

  setLocalStorageVideos(videoItems: VideoItem[]): void {
    localStorage.setItem('videoItems', JSON.stringify({videoItems}));
  }

  addVideo(video: VideoItem): void {
    const VideoDatabase = this.getVideoItems();
    VideoDatabase.push(video);
    VideoDatabase.sort((a, b) => {
      const dateA = moment(a.dateAdded).format('YYYYMMDDHHmmss');
      const dateB = moment(b.dateAdded).format('YYYYMMDDHHmmss');
      // without "as any" tslint gives an error
      // @ts-ignore
      return (dateB) - (dateA);
    });
    this.setLocalStorageVideos(VideoDatabase);
  }

  getVideoItems(): VideoItem[] {
    const localStorageItem = JSON.parse(localStorage.getItem('videoItems'));
    return localStorageItem == null ? [] : localStorageItem.videoItems;
  }

  videoInDatabase(vidId: string) {
    const videoItems = this.getVideoItems() as VideoItem[];
    return videoItems.map((val) => val.id).indexOf(vidId);
  }

  getExampleLocalStorageUrls(): string[] {
    return [

      'PlGbgd4aVZo',
      '0tNY10tBXCo',
      'eIho2S0ZahI'
      // 'PlGbgd4aVZo',
      // '0tNY10tBXCo'
      // 'tuBsnLLyA-I',
      // 'm4m1XZUR8VU',
      // 'R1Qbr8T5b4g',
      // 'WIwZ4kZEiAY',
      // '9zDDxhL8p2E',
      // 'YxDvTXP3KG8',
      // '8ZKPy2IZqo8',
      // 'cOG5gg2bsfE',
      // '1AqezhM8FzM'
    ];

  }

  //
  // removeVideo(vidTitle: string): void {
  //   const videoItems = this.getVideoItems().filter((val) => val.title !== vidTitle);
  //   this.setLocalStorageVideos(videoItems);
  // }

  // getDefaultLocalStorageVideos(): VideoItem[] {
  //   return [
  //     {
  //       views: 7243,
  //       likes: 27627,
  //       title: 'Shiba 1',
  //       img: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
  //       dateAdded: '2018-02-03',
  //       favorite: true,
  //
  //     },
  //     {
  //       views: 2643666,
  //       likes: 23462,
  //       title: 'Shiba 2',
  //       img: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
  //       dateAdded: '2018-02-02',
  //       favorite: false
  //     },
  //     {
  //       views: 2463,
  //       likes: 1234,
  //       title: 'Shiba 3',
  //       img: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
  //       dateAdded: '2018-02-14',
  //       favorite: false
  //     }
  //     // ,
  //     // {
  //     //   views: 23,
  //     //   likes: 345,
  //     //   title: 'Shiba 4',
  //     //   img: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
  //     //   dateAdded: '2018-03-02',
  //     //   favorite: false
  //     // },
  //     // {
  //     //   views: 345,
  //     //   likes: 26,
  //     //   title: 'Shiba 5',
  //     //   img: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
  //     //   dateAdded: '2017-02-02',
  //     //   favorite: true
  //     // },
  //     // {
  //     //   views: 7243,
  //     //   likes: 27627,
  //     //   title: 'Shiba 6',
  //     //   img: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
  //     //   dateAdded: '2018-11-11',
  //     //   favorite: false,
  //     // },
  //     // {
  //     //   views: 2643666,
  //     //   likes: 23462,
  //     //   title: 'Shiba Martynki',
  //     //   img: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
  //     //   dateAdded: '2018-11-24',
  //     //   favorite: true
  //     // },
  //     // {
  //     //   views: 2463,
  //     //   likes: 1234,
  //     //   title: 'Shiba 8',
  //     //   img: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
  //     //   dateAdded: '2018-06-03',
  //     //   favorite: false
  //     // },
  //     // {
  //     //   views: 23,
  //     //   likes: 345,
  //     //   title: 'Shiba 9',
  //     //   img: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
  //     //   dateAdded: '2015-05-01',
  //     //   favorite: false
  //     // },
  //     // {
  //     //   views: 345,
  //     //   likes: 26,
  //     //   title: 'Shiba 10',
  //     //   img: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
  //     //   dateAdded: '2016-01-04',
  //     //   favorite: true
  //     // }
  //   ];
  // }
}
