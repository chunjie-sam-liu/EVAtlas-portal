import { Component, OnInit } from '@angular/core';
import { StatApiService } from './stat-api.service';
import { EChartOption } from 'echarts';
import { MappingDist } from 'src/app/shared/model/mapping-dist';
import { sortBy as _sortBy } from 'lodash-es';

@Component({
  selector: 'app-samples-statistics',
  templateUrl: './samples-statistics.component.html',
  styleUrls: ['./samples-statistics.component.css'],
})
export class SamplesStatisticsComponent implements OnInit {
  exoMappingRateTitle = 'Exosomes mapping rate';
  exoMappingRate: EChartOption;
  exoMappingDistTitle = 'Exosomes RNA mapping distribution';
  exoMappingDist: EChartOption;

  mvMappingRateTitle = 'Microvesicles mapping rate';
  mvMappingRate: EChartOption;
  mvMappingDistTitle = 'Microvesicles RNA mapping distribution';
  mvMappinDist: EChartOption;

  constructor(private statApiService: StatApiService) {}

  ngOnInit(): void {
    // get exosome data
    this.statApiService.getDist('Exosomes').subscribe((res) => {
      this.exoMappingRate = this._mappingRate(res, this.exoMappingRateTitle);
    });
    // get microvesicle data
    this.statApiService.getDist('Microvesicles').subscribe((res) => {
      this.mvMappingRate = this._mappingRate(res, this.mvMappingRateTitle);
    });
  }

  private _mappingRate(d: MappingDist[], title: string): EChartOption {
    let dRate = d.map((v) => ({
      srrID: v.srr_id,
      mappingRate: (v.srr_tag_info[1] / v.srr_tag_info[0]).toFixed(2),
    }));
    dRate = _sortBy(dRate, ['mappingRate']).reverse();
    return {
      title: {
        show: false,
        text: title,
      },
      grid: {
        top: '2%',
        left: '10%',
        right: '2%',
        bottom: '10%',
      },
      toolbox: {
        showTitle: true,
        feature: {
          dataView: { show: false },
          magicType: {
            type: ['bar', 'line'],
            title: {
              bar: 'For bar charts',
              line: 'For line charts',
            },
          },
          saveAsImage: {
            title: 'Save as image',
          },
        },
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        formatter: '<strong>Sample ID</strong>: {b}<br /><strong>Mapping rate</strong>: {c}',
      },
      xAxis: {
        type: 'category',
        show: true,
        name: 'Samples',
        nameLocation: 'center',
        nameTextStyle: { fontWeight: 'bolder' },
        axisTick: { show: false },
        axisLabel: { show: false },
        data: dRate.map((srr) => srr.srrID),
      },
      yAxis: {
        type: 'value',
        show: true,
        name: 'Mapping rate',
        nameLocation: 'center',
        nameTextStyle: { fontWeight: 'bolder' },
        nameGap: 30,
      },
      series: [
        {
          data: dRate.map((srr) => srr.mappingRate),
          type: 'bar',
        },
      ],
      animationEasing: 'bounceOut',
      animationDelay: (i) => i * 0.2,
    };
  }

  private _rnaDistribution(d: MappingDist[]): EChartOption {
    return {};
  }
}
