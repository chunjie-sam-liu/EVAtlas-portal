import { Component, OnInit, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { merge, fromEvent } from 'rxjs';
import { RnaTable } from 'src/app/shared/model/rna-table';
import { RnaApiService } from './rna-api.service';
import { RnaDataSource } from './rna-data-source';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-rna-table',
  templateUrl: './rna-table.component.html',
  styleUrls: ['./rna-table.component.css'],
})
export class RnaTableComponent implements OnInit, AfterViewInit {
  @Input() rnaType: string;

  rnaTable: RnaTable;
  dataSource: RnaDataSource;
  displayedColumns = ['symbol', 'count'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('input') input: ElementRef;

  constructor(private route: ActivatedRoute, private rnaApiService: RnaApiService) {}

  ngOnInit(): void {
    // console.log(this.route.snapshot);
    console.log(this.route.snapshot.url);
    // this.rna = this.route.snapshot.data['app-rna-table'];
    this.dataSource = new RnaDataSource(this.rnaApiService);
    this.dataSource.loadRnaRecords(this.rnaType, '', 0, 3);
  }
  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadRnaPage();
        })
      )
      .subscribe();

    merge(this.paginator.page)
      .pipe(tap(() => this.loadRnaPage()))
      .subscribe();
  }

  loadRnaPage() {
    this.dataSource.loadRnaRecords(this.rnaType, this.input.nativeElement.value, this.paginator.pageIndex, this.paginator.pageSize);
  }
}
