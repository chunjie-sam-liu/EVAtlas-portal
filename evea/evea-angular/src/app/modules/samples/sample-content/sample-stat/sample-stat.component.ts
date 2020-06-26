import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TissueTable } from 'src/app/shared/model/tissue-table';
import { ContentApiService } from '../content-api.service';
import { EChartOption } from 'echarts';
import rnaType from 'src/app/shared/constants/rna-types';
import { MappingDist } from 'src/app/shared/model/mapping-dist';
import { sortBy as _sortBy, values as _values, sum as _sum } from 'lodash-es';

@Component({
  selector: 'app-sample-stat',
  templateUrl: './sample-stat.component.html',
  styleUrls: ['./sample-stat.component.css'],
})
export class SampleStatComponent implements OnInit, OnChanges {
  @Input() tissueRecord: TissueTable;
  projectPie: EChartOption;
  projectPieTitle: string;
  projectDist: EChartOption;
  projectDistTitle: string;
  constructor(private contentApiService: ContentApiService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.projectPieTitle = `${this.tissueRecord._id} mean`;
    this.projectDistTitle = `${this.tissueRecord._id} RNA mapping distribution`;

    this.contentApiService.getProjectStat(this.tissueRecord._id).subscribe((res) => {
      this.projectDist = this._rnaMappingDist(res, this.projectDistTitle);
    });
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
        data: d.map((v) => `${v.srr_id} (${v.disease}, ${v.ex_type})`),
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
