import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from 'src/app/shared/base-http.service';
import { Observable } from 'rxjs';
import { RnaBasicInfo } from 'src/app/shared/model/rna-basic-info';
import { RnaExpr } from 'src/app/shared/model/rna-expr';
import { map } from 'rxjs/operators';
import { Drug } from 'src/app/shared/model/drug';
import { MirTarget } from 'src/app/shared/model/mir-target';

@Injectable({
  providedIn: 'root',
})
export class RnaDetailApiService extends BaseHttpService {
  constructor(http: HttpClient) {
    super(http);
  }

  public findRnaBasicInfo(s: string): Observable<RnaBasicInfo> {
    return this.getData('anno/one/' + s);
  }

  public findRnaExpr(ncrna: string, type: string = 'miRNA', tissues: number = 1, exType: string = 'Exosomes'): Observable<RnaExpr[]> {
    return this.getData('ncrna/ncrnaexp', {
      ncrna,
      type,
      tissues,
      ex_type: exType,
    }).pipe(map((res) => res.data));
  }

  public getmiRNADrugs(mirna: string): Observable<Drug> {
    return this.getData('drug/db', { mirna });
  }
  public getmiRNATarget(mirna: string): Observable<MirTarget[]> {
    return this.getData('target', {
      mirna,
    }).pipe(map((res) => res.mir_target_list));
  }
}
