import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() {}

  async search(query: string) {
    return query
  }
}
