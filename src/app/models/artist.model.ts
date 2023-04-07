import { Observable } from "rxjs"
import { Album } from "./album.model"
import { baseApiModel } from "./base.model"
import { Song } from "./song.model"

export interface Artist extends baseApiModel {
  name:	string
  songs:	string[]
  albums:	string[]
  url: string

  getAlbums: () => Observable<Album[]>
  getSongs: () => Observable<Song[]>
}
