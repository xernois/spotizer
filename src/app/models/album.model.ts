import { Song } from "@models/song.model"
import { baseApiModel } from "./base.model"

export interface Album extends baseApiModel {
  title: string
  songs: Song[]
  albumtype: AlbumType
  artist: AlbumArtist
  image: string
}


export interface AlbumType {
  id: number
  name: string
}

export interface AlbumArtist {
  id: number
}
