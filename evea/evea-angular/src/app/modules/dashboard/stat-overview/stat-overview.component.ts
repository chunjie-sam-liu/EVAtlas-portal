import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import RnaTypeDist from 'src/app/shared/constants/rna-type-dist';

@Component({
  selector: 'app-stat-overview',
  templateUrl: './stat-overview.component.html',
  styleUrls: ['./stat-overview.component.css'],
})
export class StatOverviewComponent implements OnInit {
  constructor() {}
  pieChart: EChartOption = {
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

  ngOnInit(): void {}
}
