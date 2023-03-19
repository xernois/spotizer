import { HttpClient } from '@angular/common/http';
import { ApiEndpoint } from '@enums/api-endpoint.enum';
import { concatAll, firstValueFrom, map, mergeMap, toArray } from 'rxjs';
import { environment } from '@environments/environment';
import { ActivatedRouteSnapshot } from '@angular/router';
import { parseSlug } from '@src/app/functions/slug.function';
import { baseApiModel } from '@src/app/models/base.model';

export abstract class ApiService<T extends baseApiModel> {

  constructor(
    private http: HttpClient,
    private endpoint: ApiEndpoint
  ) { }

  getData(slug: string) {
    if(slug) {
      return this.http.get<T>(environment.apiUrl + this.endpoint + '/' + parseSlug(slug)).pipe(toArray())
    } else {
      return this.http.get<T[]>(environment.apiUrl + this.endpoint)
    }
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.getData(route.params['slug'])
  }
}
