import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseHttpService } from 'src/app/shared/base-http.service';
import { RnaTable } from 'src/app/shared/model/rna-table';
import { RnaRecord } from 'src/app/shared/model/rna-record';

@Injectable({
  providedIn: 'root',
})
export class RnaApiService extends BaseHttpService {
  constructor(http: HttpClient) {
    super(http);
  }

  findRnaRecords(rnaType: string, filter = '', sortOrder = 'asc', pageIndex = 0, pageSize = 10): Observable<RnaRecord[]> {
    // tslint:disable-next-line: no-string-literal
    return this.getData('ncrna/ncRNA_lst', {
      ncrna: rnaType,
      filter,
      sortOrder,
      pageIndex: pageIndex.toString,
      pageSize: pageSize.toString,
    }).pipe(map((res) => res.ncRNA_lst));
  }

  findRnaTable(rnaType: string): Observable<RnaTable> {
    return this.getData('ncrna/table' + rnaType);
  }
}
