import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { RnaDetailApiService } from '../rna-detail-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MirFunc } from 'src/app/shared/model/mir-func';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-rna-misc',
  templateUrl: './rna-misc.component.html',
  styleUrls: ['./rna-misc.component.css']
})
export class RnaMiscComponent implements OnInit {
  @Input() rnaSymbol: string;
  @Input() rnaType: string;

  dataSourceFunc: MatTableDataSource<MirFunc>;
  @ViewChild('paginatorFunc', { static: true }) paginatorFunc: MatPaginator;
  displayedColumnsFunc=['miRNA id', 'miRNA Function', 'Pubmed'];

  constructor(private rnaDetailApiService: RnaDetailApiService) { }

  ngOnInit(): void {
  }

}
