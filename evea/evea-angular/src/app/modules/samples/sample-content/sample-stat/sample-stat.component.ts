import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TissueTable } from 'src/app/shared/model/tissue-table';
import { ContentApiService } from '../content-api.service';
import { EChartOption } from 'echarts';
import rnaType from 'src/app/shared/constants/rna-types';
import { MappingDist } from 'src/app/shared/model/mapping-dist';
import { sortBy as _sortBy, values as _values, sum as _sum, indexOf } from 'lodash-es';
import { RnaHeatmap } from 'src/app/shared/model/rna-heatmap';

@Component({
  selector: 'app-sample-stat',
  templateUrl: './sample-stat.component.html',
  styleUrls: ['./sample-stat.component.css'],
})
export class SampleStatComponent implements OnInit, OnChanges {
  @Input() tissueRecord: TissueTable;
  projectHeatmap: EChartOption;
  projectHeatmapTitle: string;
  projectDist: EChartOption;
  projectDistTitle: string;
  constructor(private contentApiService: ContentApiService) { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    this.projectHeatmapTitle=`${this.tissueRecord._id} miRNA Heatmap (top 50)`;
    this.projectDistTitle=`${this.tissueRecord._id} RNA mapping distribution`;

    this.contentApiService.getProjectStat(this.tissueRecord._id).subscribe((res) => {
      this.projectDist=this._rnaMappingDist(res, this.projectDistTitle);
    });

    this.contentApiService.getProjectHeatmap(this.tissueRecord._id).subscribe((res) => {
      this.projectHeatmap=this._rnaHeatmap(res, this.projectHeatmapTitle);
    });
  }
  private _rnaMappingDist(d: MappingDist[], title: string): EChartOption {
    const series=rnaType.map((v) => ({
      name: v.label,
      type: 'bar',
      stack: 'total',
      data: [],
    }));

    d.map((v) => {
      const tagSum=_sum(_values(v.tag_stat));
      series.map((s) => {
        s.data.push(v.tag_stat[s.name]/tagSum);
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

  private _rnaHeatmap(d: RnaHeatmap[], title: string): EChartOption {
    let yAxis=[];
    const xAxis=[];
    const data=[];
    console.log(d);
    d.map((v) => {
      xAxis.push(v.srr_id);
      yAxis.push(...v.mir_lst);
    });
    yAxis=[...new Set(yAxis)];
    // push element to plot data
    xAxis.map((v, i) => {
      yAxis.map((vv, ii) => {
        data.push([i, ii, '-']);
      });
    });
    console.log(data);
    d.map((v, i) => {
      v.mir_lst.map((vv, ii) => {
        data[i*50+yAxis.indexOf(vv)]=[i, yAxis.indexOf(vv), v.exp_lst[ii]];
      });
    });

    return {
      title: {
        show: false,
        text: title,
      },
      grid: {
        top: '8%',
        left: '18%',
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
      },
      xAxis: {
        type: 'category',
        axisTick: { show: false },
        splitArea: { show: true },
        data: xAxis,
      },
      yAxis: {
        type: 'category',
        axisTick: { show: false },
        splitArea: { show: true },
        data: yAxis,
      },
      visualMap: {
        min: 0,
        max: 10,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '2%',
      },
      series: [
        {
          name: 'Punch Card',
          type: 'heatmap',
          data,
          label: { show: false },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
  }
}
