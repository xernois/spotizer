import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumComponent } from '@pages/album/album.component';
import { HomeComponent } from '@pages/home/home.component';
import { AlbumDetailsComponent } from './pages/album/components/album-details/album-details.component';
import { SongComponent } from './pages/song/song.component';
import { AlbumService } from './services/api/album.service';
import { SongService } from './services/api/song.service';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { breadcrumb: 'home' } },
  {
    path: 'album', data: { breadcrumb: 'album' }, children: [
      { path: '', component: AlbumComponent, resolve: { albums: AlbumService } },
      { path: ':slug', component: AlbumDetailsComponent, resolve: { album: AlbumService }, data: { breadcrumb: '@album.title' } }
    ]
  },
  {
    path: 'song', data: { breadcrumb: 'song' }, children: [
      { path: '', component: SongComponent, resolve: { albums: SongService } },
      { path: ':slug', component: SongComponent, resolve: { album: SongService }, data: { breadcrumb: '@song .title' } }
    ]
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
