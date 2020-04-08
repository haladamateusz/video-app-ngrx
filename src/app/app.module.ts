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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
