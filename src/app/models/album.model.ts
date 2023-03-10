import { Song } from "./song.model"

export interface Album {
  id: number
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
