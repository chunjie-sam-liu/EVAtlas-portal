import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TissueTable } from 'src/app/shared/model/tissue-table';
import rnaType from 'src/app/shared/constants/rna-types';
import samTypes from 'src/app/shared/constants/sam-types';
import { EChartOption } from 'echarts';
import { ContentApiService } from '../../content-api.service';
import { MappingDist } from 'src/app/shared/model/mapping-dist';
import { sortBy as _sortBy, values as _values, sum as _sum, indexOf, functions } from 'lodash-es';

@Component({
  selector: 'app-sample-dist',
  templateUrl: './sample-dist.component.html',
  styleUrls: ['./sample-dist.component.css'],
})
export class SampleDistComponent implements OnInit, OnChanges {
  @Input() tissueRecord: TissueTable;
  @Input() samType: String;
  @Input() sample: any;
  samTypes = samTypes;
  projectDist: EChartOption;
  projectDistTitle: string;
  isDist: boolean;
  type: string;
  keyword: string;

  constructor(private contentApiService: ContentApiService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.tissueRecord.normal_n == 0 && this.tissueRecord.tag == 'y') {
      this.samType = 'Control';
    }
    if (this.tissueRecord.normal_n == 0 && this.tissueRecord.tag == 'n') {
      this.samType = 'Case';
    }
    this.projectDistTitle = `${this.tissueRecord._id} RNA mapping distribution`;
    this.type = this.sample.select;
    this.keyword = this.sample.title;
    this.contentApiService.getProjectStat(this.tissueRecord._id, this.samType, this.type, this.keyword).subscribe((res) => {
      console.log(this.tissueRecord);
      this.isDist = res.length != 0 ? true : false;
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
        top: '10%',
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
