import { Component, OnInit } from '@angular/core';
import { StatApiService } from './stat-api.service';
import { EChartOption } from 'echarts';
import { MappingDist } from 'src/app/shared/model/mapping-dist';
import { sortBy as _sortBy, values as _values, sum as _sum } from 'lodash-es';
import rnaType from 'src/app/shared/constants/rna-types';
import statDistData from 'src/app/shared/constants/sample-stat-overview';

@Component({
  selector: 'app-samples-statistics',
  templateUrl: './samples-statistics.component.html',
  styleUrls: ['./samples-statistics.component.css'],
})
export class SamplesStatisticsComponent implements OnInit {
  statTitle = 'Tissues and samples in EVatlas';
  statDist: EChartOption;

  exoMappingRateTitle = 'Exosomes mapping rate';
  exoMappingRate: EChartOption;
  exoMappingDistTitle = 'Exosomes RNA mapping distribution';
  exoMappingDist: EChartOption;

  mvMappingRateTitle = 'Microvesicles mapping rate';
  mvMappingRate: EChartOption;
  mvMappingDistTitle = 'Microvesicles RNA mapping distribution';
  mvMappingDist: EChartOption;

  constructor(private statApiService: StatApiService) {}

  ngOnInit(): void {
    // stat
    this.statDist = this._statDist(statDistData, this.statTitle);
    // get exosome data
    this.statApiService.getDist('Exosomes').subscribe((res) => {
      this.exoMappingRate = this._mappingRate(res, this.exoMappingRateTitle);
      this.exoMappingDist = this._rnaMappingDist(res, this.exoMappingDistTitle);
    });
    // get microvesicle data
    this.statApiService.getDist('Microvesicles').subscribe((res) => {
      this.mvMappingRate = this._mappingRate(res, this.mvMappingRateTitle);
      this.mvMappingDist = this._rnaMappingDist(res, this.mvMappingDistTitle);
    });
  }
  private _statDist(d: any, title: string): EChartOption {
    return {
      title: {
        show: false,
        text: title,
      },
      grid: {
        top: '2%',
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
        nameGap: 60,
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
      // animationEasing: 'bounceOut',
      // animationDelay: (i) => i * 0.2,
    };
  }

  private _rnaMappingDist(d: MappingDist[], title: string): EChartOption {
    const series = rnaType.map((v) => ({
      name: v.label,
      type: 'bar',
      stack: 'total',
      data: [],
    }));

    d.map((v) => {
      const tagSum = _sum(_values(v.tag_stat));
      series.map((s) => {
        s.data.push(v.tag_stat[s.name] / tagSum);
      });
    });

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
        data: series.map((v) => v.name),
      },
      xAxis: {
        type: 'category',
        show: true,
        name: 'Samples',
        nameLocation: 'center',
        nameTextStyle: { fontWeight: 'bolder' },
        axisTick: { show: false },
        axisLabel: { show: false },
        data: d.map((v) => v.srr_id),
      },
      yAxis: {
        type: 'value',
        show: true,
        name: 'Mapping rate',
        nameLocation: 'center',
        nameTextStyle: { fontWeight: 'bolder' },
        nameGap: 30,
      },
      series,
    };
  }
}
