import { DataSource } from '@angular/cdk/table';
import { TargetRecord } from 'src/app/shared/model/mir-target';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CollectionViewer } from '@angular/cdk/collections';
import { RnaDetailApiService } from '../rna-detail-api.service';
import { tap, map, catchError, finalize } from 'rxjs/operators';

export class RnaTargetDataSrouce implements DataSource<TargetRecord> {
  private targetRecordSubject = new BehaviorSubject<TargetRecord[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  public resultLength: number;

  constructor(private rnaDetailApiService: RnaDetailApiService) {}

  public loadTargetRecords(mirna: string, filter: string, pageIndex: number, pageSize: number) {
    this.loadingSubject.next(true);
    this.rnaDetailApiService
      .getTargetRecords(mirna, filter, pageIndex, pageSize)
      .pipe(
        tap((val) => {
          this.resultLength = val.n_record;
        }),
        map((res) => res.mir_target_list),
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((trs) => this.targetRecordSubject.next(trs));
  }

  connect(collectionViewer: CollectionViewer): Observable<TargetRecord[]> {
    return this.targetRecordSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.targetRecordSubject.complete();
    this.loadingSubject.complete();
  }
}
