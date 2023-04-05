import { Observable } from "rxjs"
import { Album } from "./album.model"
import { Artist } from "./artist.model"
import { baseApiModel } from "./base.model"

export interface Song extends baseApiModel {
  id: number
  title:	string
  length:	number
  youtube:	string
  artist:	string
  album:	string

  getArtist: () => Observable<Artist>
  getAlbum: () => Observable<Album>
}
