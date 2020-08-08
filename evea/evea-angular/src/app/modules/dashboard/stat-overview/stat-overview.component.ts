import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import RnaTypeDist from 'src/app/shared/constants/rna-type-dist';
import statDistData from 'src/app/shared/constants/sample-stat-overview';

@Component({
  selector: 'app-stat-overview',
  templateUrl: './stat-overview.component.html',
  styleUrls: ['./stat-overview.component.css'],
})
export class StatOverviewComponent implements OnInit {
  constructor() { }
  pieChart: EChartOption={
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : ({d}%)',
    },
    series: [
      {
        name: 'RNA mapping percentage in MV/EXO',
        type: 'pie',
        radius: '90%',
        data: RnaTypeDist.map((v) => ({ name: v.rnaType, value: v.total })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  statTitle='Tissues and samples in EVatlas';
  statDist: EChartOption=this._statDist(statDistData, this.statTitle);

  ngOnInit(): void { }

  private _statDist(d: any, title: string): EChartOption {
    return {
      title: {
        show: false,
        text: title,
      },
      grid: {
        top: '8%',
        left: '10%',
        right: '2%',
        bottom: '20%',
      },
      toolbox: {
        showTitle: true,
        feature: {
          data: { show: false },
          saveAsImage: {
            title: 'Save as image',
          },
        },
      },
      tooltip: {
        show: true,
        trigger: 'axis',
      },
      legend: {
        data: d.legend,
      },
      xAxis: {
        type: 'category',
        show: true,
        name: 'Tissues',
        nameLocation: 'center',
        nameGap: 70,
        nameTextStyle: { fontWeight: 'bolder' },
        axisTick: { show: false },
        axisLabel: { show: true, interval: 0, rotate: 45 },
        data: d.xAxis,
      },
      yAxis: {
        type: 'value',
        show: true,
        name: 'Number of samples',
        nameLocation: 'center',
        nameTextStyle: { fontWeight: 'bolder' },
        nameGap: 30,
      },
      series: [
        {
          name: d.legend[0],
          type: 'bar',
          stack: 'total',
          data: d.exo,
        },
        {
          name: d.legend[1],
          type: 'bar',
          stack: 'total',
          data: d.mv,
        },
      ],
    };
  }
}
