import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from 'src/app/shared/base-http.service';
import { Observable } from 'rxjs';
import { RnaBasicInfo } from 'src/app/shared/model/rna-basic-info';
import { RnaExpr } from 'src/app/shared/model/rna-expr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RnaDetailApiService extends BaseHttpService {
  constructor(http: HttpClient) {
    super(http);
  }

  public findRnaBasicInfo(s: string): Observable<RnaBasicInfo> {
    return this.getData('anno', {
      ncrna: s,
    });
  }

  public findRnaExpr(ncrna: string, type: string = 'miRNA', tissues: number = 1, exType: string = 'Exosomes'): Observable<RnaExpr[]> {
    return this.getData('ncrna/ncrnaexp', {
      ncrna,
      type,
      tissues,
      ex_type: exType,
    }).pipe(map((res) => res.data));
  }
}
