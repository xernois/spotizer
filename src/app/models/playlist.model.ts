import { Observable } from "rxjs"
import { baseApiModel } from "./base.model"
import { Song } from "./song.model"

export interface Playlist extends baseApiModel {
  name: string
  songs: string[]

  image: string
  url: string
  getSong: () => Observable<Song[]>
}
