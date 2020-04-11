import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { VideoShellComponent } from './video/containers/video-shell/video-shell.component';
import { VideoListComponent } from './video/components/video-list/video-list.component';
import { VideoColumnsComponent } from './video/components/video-columns/video-columns.component';
import { EffectsModule } from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment.prod';
import {AppRoutingModule} from './app-routing-module';
import {VideoModule} from './video/video.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {VideoService} from './video/video.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      name: 'APM DEMO Devtools',
      maxAge: 25,
      logOnly: environment.production
    }),
    AppRoutingModule,
    VideoModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [VideoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
