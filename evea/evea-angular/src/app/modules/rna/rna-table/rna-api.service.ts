import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RnaApiService {
  constructor(private http: HttpClient) {}

  findRnas(count: number, filter = '', pageNumber = 0, pageSize = 3): Observable<any[]> {
    return this.http
      .get('http://localhost:5000/api/ncrna/ncRNA_lst', {
        params: new HttpParams()
          .set('ncrna', 'miRNA')
          .set('filter', filter)
          .set('pageNumber', pageNumber.toString())
          .set('pageSize', pageSize.toString()),
      })
      .pipe(map((res) => res.ncRNA_lst));
  }
}
