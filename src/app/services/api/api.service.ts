import { HttpClient } from '@angular/common/http';
import { ApiEndpoint } from '@enums/api-endpoint.enum';
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';

export abstract class ApiService<T> {

  static BASE_API_URL = 'http://spotizer.xernois.fr/~morap01/L250/public/index.php/api/'

  private data: T[] = []

  constructor(
    private http: HttpClient,
    private endpoint: ApiEndpoint
  ) {}

  async setDataAPI() {
    this.data = await firstValueFrom(this.http.get<T[]>(ApiService.BASE_API_URL + this.endpoint))
  }

  getDataJS() {
    return this.data
  }
}
