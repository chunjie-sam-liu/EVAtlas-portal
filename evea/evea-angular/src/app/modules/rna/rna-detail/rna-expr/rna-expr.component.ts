import { Component, OnInit, Input } from '@angular/core';
import { EChartOption } from 'echarts';
import * as echarts from 'echarts';
import { RnaDetailApiService } from '../rna-detail-api.service';
import { RnaExpr } from 'src/app/shared/model/rna-expr';

@Component({
  selector: 'app-rna-expr',
  templateUrl: './rna-expr.component.html',
  styleUrls: ['./rna-expr.component.css'],
})
export class RnaExprComponent implements OnInit {
  @Input() rnaSymbol: string;
  @Input() rnaType: string;

  exoDist: EChartOption;
  exoDistTitle: string;
  mvDist: EChartOption;
  mvDistTitle: string;

  constructor(private rnaDetialApiService: RnaDetailApiService) { }

  ngOnInit(): void {
    this.exoDistTitle=`${this.rnaSymbol} from exosomes average expression across tissues`;
    this.mvDistTitle=`${this.rnaSymbol} from microvesicles average expression across tissues`;

    this.rnaDetialApiService.findRnaExpr(this.rnaSymbol, this.rnaType, 1, 'Exosomes').subscribe((res) => {
      this.exoDist=this._plotDist(res, this.exoDistTitle, this.rnaSymbol);
    });

    this.rnaDetialApiService.findRnaExpr(this.rnaSymbol, this.rnaType, 1, 'Microvesicles').subscribe((res) => {
      this.mvDist=this._plotDist(res, this.mvDistTitle, this.rnaSymbol);
    });
  }

  private _plotDist(d: RnaExpr[], title: string, r: string): EChartOption {
    const dd=d.sort((a, b) => (a.average>b.average? -1:1));
    const dataShadow=[];
    const data=dd.map((v) => v.average);
    const dataAxis=dd.map((v) => {
      dataShadow.push(data[0]+data[0]*0.1);
      return v.tissues.replace('_', ' ');
    });

    return {
      title: { show: false, text: title },
      grid: { top: '8%', left: '10%', right: '2%', bottom: '20%' },
      toolbox: {
        showTtile: true,
        feature: {
          data: { show: false },
          saveAsImage: { title: 'Save as image' },
        },
      },
      xAxis: {
        axisLabel: {
          rotate: '45',
          textStyle: { color: '#000' },
        },
        axisTick: { show: false },
        axisLine: { show: false },
        data: dataAxis,
        z: 10,
      },
      yAxis: {
        type: 'value',
        show: true,
        name: `${r} expression (RPM)`,
        nameLocation: 'center',
        nameTextStyle: { fontWeight: 'bolder' },
        nameGap: 50,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          textStyle: {
            color: '#999',
          },
        },
      },
      dataZoom: [{ type: 'inside' }],
      series: [
        {
          type: 'bar',
          itemStyle: { color: 'rgba(0,0,0,0.05)' },
          barGap: '-100%',
          barCategoryGap: '40%',
          data: dataShadow,
          animation: false,
        },
        {
          type: 'bar',
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' },
            ]),
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#2378f7' },
                { offset: 0.7, color: '#2378f7' },
                { offset: 1, color: '#83bff6' },
              ]),
            },
          },
          data,
        },
      ],
    };
  }
}
