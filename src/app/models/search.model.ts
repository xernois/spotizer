import { Album } from "./album.model"
import { Artist } from "./artist.model"
import { Playlist } from "./playlist.model"
import { Song } from "./song.model"

export type SearchQuery = string

export type SearchResult = {
  albums?: Album[]
  songs?: Song[]
  artists?: Artist[]
  playlists?: Playlist[]
}

export type SearchObject = {
  name? : string
  title? : string,
} & ({name : string} | {title : string})