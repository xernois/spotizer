import { Album } from "./album.model"
import { Artist } from "./artist.model"
import { Song } from "./song.model"

export type SearchQuery = string

export type SearchResult = {
  albums?: Album[]
  songs?: Song[]
  artists?: Artist[]
}

export type SearchObject = {
  name: string
  title: string,
}