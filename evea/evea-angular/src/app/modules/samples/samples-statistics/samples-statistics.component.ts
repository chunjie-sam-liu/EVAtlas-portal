import { Component, OnInit } from '@angular/core';
import { StatApiService } from './stat-api.service';
import { EChartOption } from 'echarts';

@Component({
  selector: 'app-samples-statistics',
  templateUrl: './samples-statistics.component.html',
  styleUrls: ['./samples-statistics.component.css'],
})
export class SamplesStatisticsComponent implements OnInit {
  mappingRate: EChartOption = {
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
  constructor(private statApiService: StatApiService) {}

  ngOnInit(): void {
    this.statApiService.getDist('exosome').subscribe((val) => {
      console.log(val);
    });
  }
}
