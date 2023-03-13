import { HttpClient } from '@angular/common/http';
import { ApiEndpoint } from '@enums/api-endpoint.enum';
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { environment } from '@environments/environment';

export abstract class ApiService<T> {

  private data: T[] = []

  constructor(
    private http: HttpClient,
    private endpoint: ApiEndpoint
  ) {}

  async setDataAPI() {
    this.data = await firstValueFrom(this.http.get<T[]>(environment.apiUrl + this.endpoint))
  }

  getDataJS() {
    return this.data
  }
}
