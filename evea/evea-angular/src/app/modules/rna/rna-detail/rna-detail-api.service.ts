import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from 'src/app/shared/base-http.service';
import { Observable } from 'rxjs';
import { RnaBasicInfo } from 'src/app/shared/model/rna-basic-info';
import { RnaExpr } from 'src/app/shared/model/rna-expr';
import { map } from 'rxjs/operators';
import { DrugRecord } from 'src/app/shared/model/drug';
import { TargetRecord } from 'src/app/shared/model/mir-target';

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

  public getmiRNADrugs(mirna: string): Observable<DrugRecord[]> {
    return this.getData('drug/db', { mirna }).pipe(map((res) => res.mir_drug_list));
  }
  public getmiRNATarget(mirna: string): Observable<TargetRecord[]> {
    return this.getData('target', { mirna }).pipe(map((res) => res.mir_target_list));
  }
}
