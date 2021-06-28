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
  ismvDist: Boolean;
  ismvSouDist: Boolean;

  rnaSymbolShow: string;

  exoDist: EChartOption;
  exoDistTitle: string;
  mvDist: EChartOption;
  mvDistTitle: string;
  exoSouDist: EChartOption;
  exoSouDistTitle: string;
  mvSouDist: EChartOption;
  mvSouDistTitle: string;

  constructor(private rnaDetialApiService: RnaDetailApiService) {}

  ngOnInit(): void {
    this.rnaSymbolShow = this.rnaSymbol.replace(/\#.*/, '');

    this.exoDistTitle = `${this.rnaSymbolShow} from sEV average expression across tissues`;
    this.mvDistTitle = `${this.rnaSymbolShow} from lEV average expression across tissues`;
    this.exoSouDistTitle = `${this.rnaSymbolShow} from sEV average expression across sources`;
    this.mvSouDistTitle = `${this.rnaSymbolShow} from lEV average expression across sources`;

    this.rnaDetialApiService.findRnaExpr(this.rnaSymbol, this.rnaType, 1, 'Exosomes').subscribe((res) => {
      this.exoDist = this._plotDist(res, this.exoDistTitle, this.rnaSymbolShow);
    });

    this.rnaDetialApiService.findRnaExpr(this.rnaSymbol, this.rnaType, 1, 'Microvesicles').subscribe((res) => {
      this.ismvDist = res.length != 0 ? true : false;
      console.log(this.ismvDist);
      console.log(res);
      this.mvDist = this._plotDist(res, this.mvDistTitle, this.rnaSymbolShow);
    });

    this.rnaDetialApiService.findRnaExprS(this.rnaSymbol, this.rnaType, 1, 'Exosomes').subscribe((res) => {
      this.exoSouDist = this._plotDistS(res, this.exoSouDistTitle, this.rnaSymbolShow);
    });

    this.rnaDetialApiService.findRnaExprS(this.rnaSymbol, this.rnaType, 1, 'Microvesicles').subscribe((res) => {
      this.ismvSouDist = res.length != 0 ? true : false;
      this.mvSouDist = this._plotDistS(res, this.mvSouDistTitle, this.rnaSymbolShow);
    });
  }

  private _plotDist(d: RnaExpr[], title: string, r: string): EChartOption {
    const dd = d.sort((a, b) => (a.average > b.average ? -1 : 1));
    const dataShadow = [];
    const data = dd.map((v) => v.average);
    const dataAxis = dd.map((v) => {
      dataShadow.push(data[0] + data[0] * 0.1);
      return v.tissues.replace('_', ' ');
    });

    return {
      title: { show: false, text: title },
      grid: { top: '8%', left: '12%', right: '2%', bottom: '20%' },
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
        nameGap: 40,
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

  private _plotDistS(d: RnaExpr[], title: string, r: string): EChartOption {
    const dd = d.sort((a, b) => (a.average > b.average ? -1 : 1));
    const dataShadow = [];
    const data = dd.map((v) => v.average);
    const dataAxis = dd.map((v) => {
      dataShadow.push(data[0] + data[0] * 0.1);
      return v.source.replace('_', ' ');
    });

    return {
      title: { show: false, text: title },
      grid: { top: '8%', left: '12%', right: '2%', bottom: '20%' },
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
              { offset: 0, color: '#FFA500' },
              { offset: 0.5, color: '#FFA500' },
              { offset: 1, color: '#FF8C00' },
            ]),
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#FF8C00' },
                { offset: 0.7, color: '#FFA500' },
                { offset: 1, color: '#FFA500' },
              ]),
            },
          },
          data,
        },
      ],
    };
  }
}
