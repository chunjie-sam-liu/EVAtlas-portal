import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BaseHttpService {
  constructor(private httpClient: HttpClient) {}

  public getData(route: string): Observable<any> {
    return this.httpClient
      .get<any>(this.createRoute(route, environment.apiURL))
      .pipe(catchError(this.handleError<any>()));
  }

  private createRoute(route: string, envURL: string): string {
    return `${envURL}/${route}`;
  }

  private handleError<T>(result?: T) {
    return (err: any): Observable<T> => {
      console.error(err);
      return of(result);
    };
  }
}
