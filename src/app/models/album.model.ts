import { Song } from "@models/song.model"
import { baseApiModel } from "./base.model"
import { Artist } from "@models/artist.model"
import { Observable } from "rxjs"

export interface Album extends baseApiModel {
  title: string
  songs: Song[]
  albumtype: AlbumType
  artist: AlbumArtist
  image: string
  url: string

  getArtist: () => Observable<Artist>
}

export interface AlbumType {
  id: number
  name: string
}

export interface AlbumArtist {
  id: number
}
