import { baseApiModel } from "./base.model"

export interface Song extends baseApiModel {
  id: number
  title:	string
  length:	number
  youtube:	string
  artist:	string
  album:	string
}
