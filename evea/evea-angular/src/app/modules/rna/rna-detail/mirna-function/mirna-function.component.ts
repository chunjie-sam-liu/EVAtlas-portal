import { Component, OnInit, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { RnaDetailApiService } from '../rna-detail-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { DrugRecord } from 'src/app/shared/model/drug';
import { TargetRecord } from 'src/app/shared/model/mir-target';
import { MatPaginator } from '@angular/material/paginator';
import { RnaTargetDataSrouce } from './rna-target-data-source';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { merge, fromEvent } from 'rxjs';

@Component({
  selector: 'app-mirna-function',
  templateUrl: './mirna-function.component.html',
  styleUrls: ['./mirna-function.component.css'],
})
export class MirnaFunctionComponent implements OnInit, AfterViewInit {
  @Input() rnaSymbol: string;
  @Input() rnaType: string;

  dataSourceDrug: MatTableDataSource<DrugRecord>;
  @ViewChild('paginatorDrug', { static: true }) paginatorDrug: MatPaginator;
  displayedColumnsDrug=['FDA', 'CID', 'Small_molecule', 'Source', 'PMID'];

  dataSourceTarget: RnaTargetDataSrouce;
  @ViewChild('paginatorTarget', { static: true }) paginatorTarget: MatPaginator;
  @ViewChild('input') input: ElementRef;
  displayedColumnsTarget=['Target', 'Confidence', 'Source', 'Experiment', 'PMID'];

  constructor(private rnaDetailApiService: RnaDetailApiService) { }

  ngOnInit(): void {
    this.rnaDetailApiService.getmiRNADrugs(this.rnaSymbol).subscribe((res) => {
      this.dataSourceDrug=new MatTableDataSource(res);
      this.dataSourceDrug.paginator=this.paginatorDrug;
    });

    this.dataSourceTarget=new RnaTargetDataSrouce(this.rnaDetailApiService);
    this.dataSourceTarget.loadTargetRecords(this.rnaSymbol, '', 0, 5);
  }
  ngAfterViewInit(): void {
    this.paginatorTarget.page.pipe(tap(() => this._loadTargetRecords()));
    merge(this.paginatorTarget.page)
      .pipe(tap(() => this._loadTargetRecords()))
      .subscribe();

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginatorTarget.pageIndex=0;
          this._loadTargetRecords();
        })
      )
      .subscribe();
  }
  private _loadTargetRecords() {
    this.dataSourceTarget.loadTargetRecords(
      this.rnaSymbol,
      this.input.nativeElement.value,
      this.paginatorTarget.pageIndex,
      this.paginatorTarget.pageSize
    );
  }
}
