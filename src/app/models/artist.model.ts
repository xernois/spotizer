import { baseApiModel } from "./base.model"

export interface Artist extends baseApiModel {
  name:	string
  songs:	string[]
  albums:	string[]
}
