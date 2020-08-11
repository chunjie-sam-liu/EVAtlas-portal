import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { EChartOption } from 'echarts';
import * as echarts from 'echarts';
import { RnaDetailApiService } from '../rna-detail-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MirFunc } from 'src/app/shared/model/mir-func';
import { MatPaginator } from '@angular/material/paginator';
import { TcgaMir } from 'src/app/shared/model/tcga-mir';

@Component({
  selector: 'app-rna-misc',
  templateUrl: './rna-misc.component.html',
  styleUrls: ['./rna-misc.component.css']
})
export class RnaMiscComponent implements OnInit {
  @Input() rnaSymbol: string;
  @Input() rnaType: string;

  tcgaExp: EChartOption;
  tcgaExpTitle: string;

  dataSourceFunc: MatTableDataSource<MirFunc>;
  @ViewChild('paginatorFunc', { static: true }) paginatorFunc: MatPaginator;
  displayedColumnsFunc=['miRNA id', 'miRNA Function', 'Pubmed'];

  constructor(private rnaDetailApiService: RnaDetailApiService) { }

  ngOnInit(): void {
    this.tcgaExpTitle=`${this.rnaSymbol} from TCGA average expression across cancers`;

    this.rnaDetailApiService.findtcgaExpr(this.rnaSymbol).subscribe((res) => {
      console.log(res);
      this.tcgaExp=this._plotDist(res, this.tcgaExpTitle, this.rnaSymbol);
    });

    this.rnaSymbol=this.rnaSymbol.replace(/-[3|5]p/, "");
    this.rnaDetailApiService.getmiRNAFuncs(this.rnaSymbol).subscribe((res) => {
      this.dataSourceFunc=new MatTableDataSource(res);
      this.dataSourceFunc.paginator=this.paginatorFunc;
    });
  }
  private _plotDist(d: TcgaMir[], title: string, r: string): EChartOption {
    const yAxis=[];
    const xAxis=[];
    console.log(d);
    for (let key in d[0]) {
      yAxis.push(d[0][key]);
      xAxis.push(key);
    };
    const dataShadow=[];
    const data=d.map((v) => v.ACC_case);
    const dataAxis=d.map((v) => {
      dataShadow.push(data[0]+data[0]*0.1);
      return v.ACC_case;
    });

    return {
      legend: {},
      tooltip: {},
      dataset: {
        dimensions: ['Sample', 'cancer', 'normal'],
        source: [
          { Sample: 'Matcha Latte', 'cancer': 43.3, 'normal': 85.8 },
          { Sample: 'Milk Tea', 'cancer': 83.1, 'normal': 73.4 },
          { Sample: 'Cheese Cocoa', 'cancer': 86.4, 'normal': 65.2 },
          { Sample: 'Walnut Brownie', 'cancer': 72.4, 'normal': 53.9 }
        ]
      },
      xAxis: { type: 'category' },
      yAxis: {},
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: [
        { type: 'bar' },
        { type: 'bar' }
      ]
    };
  };
}
