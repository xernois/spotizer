import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from '@pages/home/home.component';
import { AlbumComponent } from '@pages/album/album.component';
import { HeaderComponent } from '@components/header/header.component';
import { BreadcrumbComponent } from '@components/header/components/breadcrumb/breadcrumb.component';
import { AlbumDetailsComponent } from './pages/album/components/album-details/album-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlbumComponent,
    HeaderComponent,
    BreadcrumbComponent,
    AlbumDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
