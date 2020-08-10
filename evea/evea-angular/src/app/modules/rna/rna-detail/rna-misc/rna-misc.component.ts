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
      this.tcgaExp=this._plotDist(res, this.tcgaExpTitle, this.rnaSymbol);
    });

    this.rnaSymbol=this.rnaSymbol.replace(/-[3|5]p/, "");
    this.rnaDetailApiService.getmiRNAFuncs(this.rnaSymbol).subscribe((res) => {
      console.log(res);
      this.dataSourceFunc=new MatTableDataSource(res);
      this.dataSourceFunc.paginator=this.paginatorFunc;
      console.log(this.dataSourceFunc);
    });

    // private _plotDist(d: TcgaMir[], title: string, r: string): EChartOption {
    //   console.log(d);
    //   const dd=d.sort((a, b) => (a.average>b.average? -1:1));
    //   const dataShadow=[];
    //   const data=dd.map((v) => v.average);
    //   const dataAxis=dd.map((v) => {
    //     dataShadow.push(data[0]+data[0]*0.1);
    //     return v.tissues.replace('_', ' ');
    //   });

    //   return {
    //     title: { show: false, text: title },
    //     grid: { top: '8%', left: '12%', right: '2%', bottom: '20%' },
    //     toolbox: {
    //       showTtile: true,
    //       feature: {
    //         data: { show: false },
    //         saveAsImage: { title: 'Save as image' },
    //       },
    //     },
    //     xAxis: {
    //       axisLabel: {
    //         rotate: '45',
    //         textStyle: { color: '#000' },
    //       },
    //       axisTick: { show: false },
    //       axisLine: { show: false },
    //       data: dataAxis,
    //       z: 10,
    //     },
    //     yAxis: {
    //       type: 'value',
    //       show: true,
    //       name: `${r} expression (RPM)`,
    //       nameLocation: 'center',
    //       nameTextStyle: { fontWeight: 'bolder' },
    //       nameGap: 50,
    //       axisLine: { show: false },
    //       axisTick: { show: false },
    //       axisLabel: {
    //         textStyle: {
    //           color: '#999',
    //         },
    //       },
    //     },
    //     dataZoom: [{ type: 'inside' }],
    //     series: [
    //       {
    //         type: 'bar',
    //         itemStyle: { color: 'rgba(0,0,0,0.05)' },
    //         barGap: '-100%',
    //         barCategoryGap: '40%',
    //         data: dataShadow,
    //         animation: false,
    //       },
    //       {
    //         type: 'bar',
    //         itemStyle: {
    //           color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    //             { offset: 0, color: '#83bff6' },
    //             { offset: 0.5, color: '#188df0' },
    //             { offset: 1, color: '#188df0' },
    //           ]),
    //         },
    //         emphasis: {
    //           itemStyle: {
    //             color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    //               { offset: 0, color: '#2378f7' },
    //               { offset: 0.7, color: '#2378f7' },
    //               { offset: 1, color: '#83bff6' },
    //             ]),
    //           },
    //         },
    //         data,
    //       },
    //     ],
    //   };
    // };
  }
}
