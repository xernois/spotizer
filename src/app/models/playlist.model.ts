import { Observable } from "rxjs"
import { baseApiModel } from "./base.model"
import { Song } from "./song.model"

export interface Playlist extends baseApiModel {
  name: string
  songs: Song[]

  image: string
  url: string
  getSong: () => Observable<Song[]>
}
