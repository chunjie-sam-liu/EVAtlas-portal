import { Component, OnInit, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { merge, fromEvent } from 'rxjs';
import { RnaTable } from 'src/app/shared/model/rna-table';
import { RnaApiService } from './rna-api.service';
import { RnaDataSource } from './rna-data-source';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-rna-table',
  templateUrl: './rna-table.component.html',
  styleUrls: ['./rna-table.component.css'],
})
export class RnaTableComponent implements OnInit, AfterViewInit {
  @Input() rnaType: string;

  dataSource: RnaDataSource;
  displayedColumns = ['symbol', 'loci', 'tissues', 'samples'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(private route: ActivatedRoute, private rnaApiService: RnaApiService) {}

  ngOnInit(): void {
    this.dataSource = new RnaDataSource(this.rnaApiService);
    this.dataSource.loadRnaRecords(this.rnaType, '', 'desc', 0, 10);
  }
  ngAfterViewInit(): void {
    this.paginator.page.pipe(tap(() => this._loadRnaRecordsPage()));

    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this._loadRnaRecordsPage()))
      .subscribe();

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this._loadRnaRecordsPage();
        })
      )
      .subscribe();
  }

  private _loadRnaRecordsPage(): void {
    this.dataSource.loadRnaRecords(
      this.rnaType,
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }
}
