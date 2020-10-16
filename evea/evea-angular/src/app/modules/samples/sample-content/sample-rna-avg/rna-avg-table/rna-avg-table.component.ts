import { Component, OnInit, Input, OnChanges, SimpleChanges, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { TissueTable } from 'src/app/shared/model/tissue-table';
import { ContentApiService } from '../../content-api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RnaAvgDataSource } from './rna-avg-data-source';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { merge, fromEvent } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rna-avg-table',
  templateUrl: './rna-avg-table.component.html',
  styleUrls: ['./rna-avg-table.component.css'],
})
export class RnaAvgTableComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() rnaType: string;
  @Input() tissueRecord: TissueTable;
  @Input() sample: any;
  type: string;
  keyword: string;

  dataSource: RnaAvgDataSource;
  displayedColumns = ['symbol', 'case_mean', 'case_n', 'normal_mean', 'normal_n'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(private contentApiService: ContentApiService, private router: Router) {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    this.type = 'tissue_id';
    this.keyword = this.sample.title;
    this.dataSource = new RnaAvgDataSource(this.contentApiService);
    this.dataSource.loadRnaAvgRecords(this.tissueRecord._id, this.rnaType, '', 'case_mean', 'desc', 0, 10, this.type, this.keyword);
  }
  ngAfterViewInit(): void {
    this.paginator.page.pipe(tap(() => this._loadRnaAvgRecordsPage()));
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this._loadRnaAvgRecordsPage()))
      .subscribe();

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this._loadRnaAvgRecordsPage();
        })
      )
      .subscribe();
  }

  private _loadRnaAvgRecordsPage(): void {
    this.dataSource.loadRnaAvgRecords(
      this.tissueRecord._id,
      this.rnaType,
      this.input.nativeElement.value,
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.type,
      this.keyword
    );
  }

  public goToDetail(s: string) {
    this.router.navigate([`rna/detail/${s}`]);
  }
}
