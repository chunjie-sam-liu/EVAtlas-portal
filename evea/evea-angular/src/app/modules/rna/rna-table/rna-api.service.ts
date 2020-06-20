import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RnaApiService {
  constructor(private http: HttpClient) {}

  findLessons(courseId: number, filter = '', sortOrder = 'asc', pageNumber = 0, pageSize = 3): Observable<any[]> {
    return this.http
      .get('/api/lessons', {
        params: new HttpParams()
          .set('courseId', courseId.toString())
          .set('filter', filter)
          .set('sortOrder', sortOrder)
          .set('pageNumber', pageNumber.toString())
          .set('pageSize', pageSize.toString()),
      })
      .pipe(
        // tslint:disable-next-line: no-string-literal
        map((res) => res['payload'])
      );
  }
}
