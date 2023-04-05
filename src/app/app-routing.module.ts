import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumComponent } from '@pages/album/album.component';
import { HomeComponent } from '@pages/home/home.component';
import { AlbumDetailsComponent } from './pages/album/components/album-details/album-details.component';
import { ArtistDetailsComponent } from './pages/artist/components/artist-details/artist-details.component';
import { LikeComponent } from './pages/like/like.component';
import { ArtistComponent } from './pages/artist/artist.component';
import { AlbumResolver } from './resolvers/album.resolver';
import { ArtistResolver } from './resolvers/artist.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { breadcrumb: 'home' } },
  {
    path: 'album', data: { breadcrumb: 'album' }, children: [
      { path: '', component: AlbumComponent },
      { path: ':slug', component: AlbumDetailsComponent, resolve: { album: AlbumResolver }, data: { breadcrumb: '@album.title' } }
    ]
  },
  {
    path: 'artist', data: { breadcrumb: 'artist' }, children: [
      { path: '', component: ArtistComponent },
      { path: ':slug', component: ArtistDetailsComponent, resolve: { artist: ArtistResolver }, data: { breadcrumb: '@artist.name' } }
    ]
  },
  { path: 'like', component: LikeComponent, data: { breadcrumb: 'like' } },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
