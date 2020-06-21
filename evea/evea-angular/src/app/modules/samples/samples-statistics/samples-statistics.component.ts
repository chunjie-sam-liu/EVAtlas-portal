import { Component, OnInit } from '@angular/core';
import { StatApiService } from './stat-api.service';
import { EChartOption } from 'echarts';
import { MappingDist } from 'src/app/shared/model/mapping-dist';

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
    // get exosome data
    this.statApiService.getDist('exosome').subscribe((res) => {
      console.log(res[1]);
      const a = res.map((v) => v.srr_tag_info[1] / v.srr_tag_info[0]);
      console.log(a);
    });
  }

  private _densityPlot(d: MappingDist[]): EChartOption {
    const dRate = d.map((v) => v.srr_tag_info[1] / v.srr_tag_info[0]);
    return {};
  }
}
