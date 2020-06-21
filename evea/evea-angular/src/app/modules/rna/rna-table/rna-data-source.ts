import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { RnaApiService } from './rna-api.service';
import { RnaRecord } from 'src/app/shared/model/rna-record';

export class RnaDataSource implements DataSource<RnaRecord> {
  private rnaRecordSubject = new BehaviorSubject<RnaRecord[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private rnaApiService: RnaApiService) {}

  loadRnaRecords(rnaType: string, filter: string, sortOrder: string, pageIndex: number, pageSize: number) {
    this.loadingSubject.next(true);

    this.rnaApiService
      .findRnaRecords(rnaType, filter, sortOrder, pageIndex, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((rnas) => this.rnaRecordSubject.next(rnas));
  }

  connect(collectionViewer: CollectionViewer): Observable<RnaRecord[]> {
    console.log('Connecting data source');
    return this.rnaRecordSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.rnaRecordSubject.complete();
    this.loadingSubject.complete();
  }
}
