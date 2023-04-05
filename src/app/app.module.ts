import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from '@pages/home/home.component';
import { AlbumComponent } from '@pages/album/album.component';
import { HeaderComponent } from '@components/header/header.component';
import { AlbumDetailsComponent } from './pages/album/components/album-details/album-details.component';
import { BreadcrumbComponent } from './components/header/components/breadcrumb/breadcrumb.component';
import { CommonModule } from '@angular/common';
import { PanelNavigationComponent } from './components/panel-navigation/panel-navigation.component';
import { PanelUserComponent } from './components/panel-user/panel-user.component';
import { PlayerComponent } from './components/player/player.component';
import { YoutubePlayerComponent } from './components/youtube-player/youtube-player.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SkeletonComponent } from './components/skeleton/skeleton.component';
import { SkeletonDirective } from './directives/skeleton.directive';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { LikeComponent } from './pages/like/like.component';
import { ArtistComponent } from './pages/artist/artist.component';
import { ArtistDetailsComponent } from './pages/artist/components/artist-details/artist-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlbumComponent,
    HeaderComponent,
    AlbumDetailsComponent,
    BreadcrumbComponent,
    PanelNavigationComponent,
    PanelUserComponent,
    PlayerComponent,
    YoutubePlayerComponent,
    SkeletonComponent,
    SkeletonDirective,
    SearchBarComponent,
    LikeComponent,
    ArtistComponent,
    ArtistDetailsComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
