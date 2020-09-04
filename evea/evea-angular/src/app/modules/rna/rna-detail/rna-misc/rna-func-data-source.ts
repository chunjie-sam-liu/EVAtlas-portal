import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CollectionViewer } from '@angular/cdk/collections';
import { RnaDetailApiService } from '../rna-detail-api.service';
import { tap, map, catchError, finalize } from 'rxjs/operators';
import { MirFunc } from 'src/app/shared/model/mir-func';

export class RnaFuncDataSrouce implements DataSource<MirFunc> {
  private funcRecordSubject = new BehaviorSubject<MirFunc[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  public resultLength: number;

  constructor(private rnaDetailApiService: RnaDetailApiService) {}

  public loadFuncRecords(mirna: string, filter: string, pageIndex: number, pageSize: number) {
    this.loadingSubject.next(true);
    this.rnaDetailApiService
      .getFuncRecords(mirna, filter, pageIndex, pageSize)
      .pipe(
        tap((val) => {
          this.resultLength = val.n_record;
        }),
        map((res) => res.mir_func_list),
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((trs) => this.funcRecordSubject.next(trs));
  }

  connect(collectionViewer: CollectionViewer): Observable<MirFunc[]> {
    return this.funcRecordSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.funcRecordSubject.complete();
    this.loadingSubject.complete();
  }
}
