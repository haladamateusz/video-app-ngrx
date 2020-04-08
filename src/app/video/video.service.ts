import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {VideoItem} from "./interfaces/video-item";

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor() { }

  getDefaultLocalStorageVideos(): VideoItem[] {
    return [
      {
        views: 7243,
        likes: 27627,
        title: 'Shiba 1',
        img: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
        dateAdded: '2018-02-03',
        favorite: true,

      },
      {
        views: 2643666,
        likes: 23462,
        title: 'Shiba 2',
        img: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
        dateAdded: '2018-02-02',
        favorite: false
      },
      {
        views: 2463,
        likes: 1234,
        title: 'Shiba 3',
        img: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
        dateAdded: '2018-02-14',
        favorite: false
      },
      {
        views: 23,
        likes: 345,
        title: 'Shiba 4',
        img: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
        dateAdded: '2018-03-02',
        favorite: false
      },
      {
        views: 345,
        likes: 26,
        title: 'Shiba 5',
        img: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
        dateAdded: '2017-02-02',
        favorite: true
      },
      {
        views: 7243,
        likes: 27627,
        title: 'Shiba 6',
        img: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
        dateAdded: '2018-11-11',
        favorite: false,
      },
      {
        views: 2643666,
        likes: 23462,
        title: 'Shiba Martynki',
        img: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
        dateAdded: '2018-11-24',
        favorite: true
      },
      {
        views: 2463,
        likes: 1234,
        title: 'Shiba 8',
        img: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
        dateAdded: '2018-06-03',
        favorite: false
      },
      {
        views: 23,
        likes: 345,
        title: 'Shiba 9',
        img: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
        dateAdded: '2015-05-01',
        favorite: false
      },
      {
        views: 345,
        likes: 26,
        title: 'Shiba 10',
        img: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
        dateAdded: '2016-01-04',
        favorite: true
      }
    ];
  }
}
