import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumComponent } from '@pages/album/album.component';
import { HomeComponent } from '@pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'album', component: AlbumComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
