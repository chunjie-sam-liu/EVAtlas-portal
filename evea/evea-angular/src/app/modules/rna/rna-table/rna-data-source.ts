import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { RnaApiService } from './rna-api.service';
import { Rna } from 'src/app/shared/model/rna-table';

export class RnaDataSource implements DataSource<Rna> {
  private rnaSubject = new BehaviorSubject<Rna[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private rnaApiService: RnaApiService) {}

  loadRnas(count: number, filter: string, pageIndex: number, pageSize: number) {
    this.loadingSubject.next(true);

    this.rnaApiService
      .findRnas(count, filter, pageIndex, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((rnas) => this.rnaSubject.next(rnas));
  }

  connect(collectionViewer: CollectionViewer): Observable<Rna[]> {
    console.log('Connecting data source');
    return this.rnaSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.rnaSubject.complete();
    this.loadingSubject.complete();
  }
}
