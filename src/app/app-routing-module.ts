import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VideoShellComponent} from './video/containers/video-shell/video-shell.component';


const routes: Routes = [
  {path: '', component: VideoShellComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
