import { HttpClient } from '@angular/common/http';
import { ApiEndpoint } from '../enums/api-endpoint.enum';

export abstract class ApiService<T> {

  static BASE_API_URL = 'http://spotizer.xernois.fr/~morap01/L250/public/index.php/api/'

  private data: T[] = []

  constructor(
    private http: HttpClient,
    private endpoint: ApiEndpoint
  ) {
    this.setDataAPI()
  }

  setDataAPI() {
    this.http.get<T[]>(ApiService.BASE_API_URL + this.endpoint).subscribe((data) => this.data = data)
  }

  getDataJS() {
    return this.data
  }
}
