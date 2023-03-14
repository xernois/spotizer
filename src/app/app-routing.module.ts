import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumComponent } from '@pages/album/album.component';
import { HomeComponent } from '@pages/home/home.component';
import { AlbumDetailsComponent } from './pages/album/components/album-details/album-details.component';
import { AlbumService } from './services/api/album.service';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { breadcrumb: 'home' } },
  {
    path: 'album', data: { breadcrumb: 'album' }, children: [
      { path: '', component: AlbumComponent },
      { path: ':slug', component: AlbumDetailsComponent, resolve: { album: AlbumService}, data: { breadcrumb: '@album.title' } }
    ]
  },
  { path: '**', redirectTo: '/'  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
