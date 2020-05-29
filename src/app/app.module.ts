import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects';
import {ActionReducer, MetaReducer, StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment.prod';
import {AppRoutingModule} from './app-routing-module';
import {VideoModule} from './video/video.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {VideoService} from '@video/services/video.service';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import {localStorageSync} from 'ngrx-store-localstorage';

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
    NgxPaginationModule,
    VideoModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [VideoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
