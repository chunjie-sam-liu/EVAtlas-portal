import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from 'src/app/shared/base-http.service';
import { Observable } from 'rxjs';
import { RnaBasicInfo } from 'src/app/shared/model/rna-basic-info';
import { RnaExpr } from 'src/app/shared/model/rna-expr';
import { map } from 'rxjs/operators';
import { DrugRecord } from 'src/app/shared/model/drug';
import { TargetRecord } from 'src/app/shared/model/mir-target';
import { MirFunc } from 'src/app/shared/model/mir-func';
import { TcgaMir } from 'src/app/shared/model/tcga-mir';
import rnaTypes from 'src/app/shared/constants/rna-types';

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

  public findRnaExprS(ncrna: string, type: string = 'miRNA', source: number = 1, exType: string = 'Exosomes'): Observable<RnaExpr[]> {
    return this.getData('ncrna/ncrnaexp', {
      ncrna,
      type,
      source,
      ex_type: exType,
    }).pipe(map((res) => res.data));
  }

  public getmiRNAFuncs(mirna: string): Observable<MirFunc[]> {
    return this.getData('misc/func_mirna/' + mirna).pipe(map((res) => res.mir_func_list));
  }

  public getFuncRecords(mirna: string, filter: string, pageIndex: number = 0, pageSize: number = 5): Observable<any> {
    return this.getData('misc/func_mirna/filter', {
      mirna,
      filter: filter.toString(),
      page: pageIndex.toString(),
      size: pageSize.toString(),
    });
  }

  public findtcgaExpr(rnaid: string, rnatype: string): Observable<TcgaMir[]> {
    return this.getData('misc/tcga_rna', {
      rnaid,
      rnatype,
    }).pipe(map((res) => res.mir_tcga_list));
  }

  public getmiRNADrugs(mirna: string): Observable<DrugRecord[]> {
    return this.getData('drug/db', { mirna }).pipe(map((res) => res.mir_drug_list));
  }
  public getmiRNATarget(mirna: string): Observable<TargetRecord[]> {
    return this.getData('target', { mirna }).pipe(map((res) => res.mir_target_list));
  }

  public getTargetRecords(mirna: string, filter: string, pageIndex: number = 0, pageSize: number = 5): Observable<any> {
    return this.getData('target/filter', {
      mirna,
      filter: filter.toString(),
      page: pageIndex.toString(),
      size: pageSize.toString(),
    });
  }
}
