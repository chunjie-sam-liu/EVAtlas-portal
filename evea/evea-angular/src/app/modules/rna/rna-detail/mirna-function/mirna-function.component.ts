import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { RnaDetailApiService } from '../rna-detail-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { DrugRecord } from 'src/app/shared/model/drug';
import { TargetRecord } from 'src/app/shared/model/mir-target';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-mirna-function',
  templateUrl: './mirna-function.component.html',
  styleUrls: ['./mirna-function.component.css'],
})
export class MirnaFunctionComponent implements OnInit {
  @Input() rnaSymbol: string;
  @Input() rnaType: string;

  dataSourceDrug: MatTableDataSource<DrugRecord>;
  @ViewChild('paginatorDrug', { static: true }) paginatorDrug: MatPaginator;
  displayedColumnsDrug = ['FDA', 'CID', 'Small_molecule', 'Source', 'PMID'];

  dataSourceTarget: MatTableDataSource<TargetRecord>;
  @ViewChild('paginatorTarget', { static: true }) paginatorTarget: MatPaginator;
  displayedColumnsTarget = ['Target', 'Confidence', 'Source', 'Experiment', 'PMID'];

  constructor(private rnaDetailApi: RnaDetailApiService) {}

  ngOnInit(): void {
    this.rnaDetailApi.getmiRNADrugs(this.rnaSymbol).subscribe((res) => {
      this.dataSourceDrug = new MatTableDataSource(res);
      this.dataSourceDrug.paginator = this.paginatorDrug;
    });

    this.rnaDetailApi.getmiRNATarget(this.rnaSymbol).subscribe((res) => {
      console.log(res);
      this.dataSourceTarget = new MatTableDataSource(res);
      this.dataSourceTarget.paginator = this.paginatorTarget;
    });
  }
}
