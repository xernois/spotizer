import { HttpClient } from '@angular/common/http';
import { ApiEndpoint } from '@enums/api-endpoint.enum';
import { firstValueFrom, of } from 'rxjs';
import { environment } from '@environments/environment';
import { ActivatedRouteSnapshot } from '@angular/router';
import { parseSlug } from '@src/app/functions/slug.function';

export abstract class ApiService<T extends { id: number }> {

  private data: T[] = []

  constructor(
    private http: HttpClient,
    private endpoint: ApiEndpoint
  ) { }

  async setDataAPI() {
    this.data = await firstValueFrom(this.http.get<T[]>(environment.apiUrl + this.endpoint))
  }

  getDataJS() {
    return this.data
  }

  resolve(route: ActivatedRouteSnapshot) {
    const slug = route.paramMap.get('slug');
    return this.getDataJS().find(item => item.id === parseSlug(slug || ''));
  }
}
