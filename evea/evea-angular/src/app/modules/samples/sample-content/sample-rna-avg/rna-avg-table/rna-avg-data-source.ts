import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { RnaAvgRecord } from 'src/app/shared/model/rna-avg-record';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ContentApiService } from '../../content-api.service';
import { tap, map, catchError, finalize } from 'rxjs/operators';

export class RnaAvgDataSource implements DataSource<RnaAvgRecord> {
  private rnaRecordSubject = new BehaviorSubject<RnaAvgRecord[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  public resultLength: number;

  constructor(private contentApiService: ContentApiService) {}
  public loadRnaAvgRecords(
    id: string,
    rnaType: string,
    filter: string,
    active: string,
    sortOrder: string,
    pageIndex: number,
    pageSize: number,
    type: string,
    keyword: string
  ) {
    this.loadingSubject.next(true);
    this.contentApiService
      .getRnaAvgRecords(id, rnaType, filter, active, sortOrder, pageIndex, pageSize, type, keyword)
      .pipe(
        tap((val) => {
          this.resultLength = val.n_record;
        }),
        map((res) => res.data),
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((rnas) => this.rnaRecordSubject.next(rnas));
  }

  connect(collectionViewer: CollectionViewer): Observable<RnaAvgRecord[]> {
    return this.rnaRecordSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.rnaRecordSubject.complete();
    this.loadingSubject.complete();
  }
}
