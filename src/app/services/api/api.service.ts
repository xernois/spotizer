import { HttpClient } from '@angular/common/http';
import { ApiEndpoint } from '@enums/api-endpoint.enum';
import { firstValueFrom, Observable, of } from 'rxjs';
import { environment } from '@environments/environment';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { parseSlug } from '@src/app/functions/slug.function';
import { baseApiModel } from '@src/app/models/base.model';

export abstract class ApiService<T extends baseApiModel> {

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

  resolve(route: ActivatedRouteSnapshot): T | undefined{
    return this.data.find(item => item.id === parseSlug(route.params['slug']));
  }
}
