import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {reducer} from './state/video.reducer';
import {VideoEffects} from './state/video.effects';
import {RouterModule, Routes} from '@angular/router';
import {VideoShellComponent} from './containers/video-shell/video-shell.component';
import { VideoNavbarComponent } from './components/video-navbar/video-navbar.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {VideoListComponent} from './components/video-list/video-list.component';
import {VideoColumnsComponent} from './components/video-columns/video-columns.component';
import { VideoAddBarComponent } from './components/video-add-bar/video-add-bar.component';
import {FormsModule} from '@angular/forms';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig, MatSnackBarModule} from '@angular/material/snack-bar';
import { VideoModalComponent } from './components/video-modal/video-modal.component';
import {PlyrModule} from 'ngx-plyr';
import {NgxPaginationModule} from 'ngx-pagination';

const productRoutes: Routes = [
  {path: '', component: VideoShellComponent}
];

const MAT_GLOBAL_CONFIG: MatSnackBarConfig = {
  duration: 2500,
  verticalPosition: 'bottom',
  horizontalPosition: 'center'
};


@NgModule({
  declarations: [VideoNavbarComponent, VideoShellComponent, VideoListComponent, VideoColumnsComponent, VideoAddBarComponent, VideoModalComponent],
  exports: [
    VideoShellComponent
  ],
  providers: [{provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: MAT_GLOBAL_CONFIG}],
  imports: [
    CommonModule,
    RouterModule.forChild(productRoutes),
    StoreModule.forFeature('videos', reducer),
    EffectsModule.forFeature([VideoEffects]),
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    PlyrModule,
    NgxPaginationModule,
  ],
  entryComponents: [VideoModalComponent]
})
export class VideoModule { }
