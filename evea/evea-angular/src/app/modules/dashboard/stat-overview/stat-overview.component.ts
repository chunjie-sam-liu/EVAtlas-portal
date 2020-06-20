import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';

@Component({
  selector: 'app-stat-overview',
  templateUrl: './stat-overview.component.html',
  styleUrls: ['./stat-overview.component.css'],
})
export class StatOverviewComponent implements OnInit {
  constructor() {}
  chartOption: EChartOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
      },
    ],
  };

  ngOnInit(): void {}
}
