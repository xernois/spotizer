import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumComponent } from '@pages/album/album.component';
import { HomeComponent } from '@pages/home/home.component';
import { AlbumDetailsComponent } from './pages/album/components/album-details/album-details.component';
import { AlbumService } from './services/api/album.service';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { breadcrumbs: ['home']} },
  { path: 'album', component: AlbumComponent, data: { breadcrumbs: ['album']} },
  { path: 'album/:slug', component: AlbumDetailsComponent, resolve: { user: AlbumService }, data: { breadcrumbs: ['album', '@album.name']} },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
