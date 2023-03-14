import { baseApiModel } from "./base.model"

export interface Playlist extends baseApiModel {
  name: string
  songs: string[]
}
