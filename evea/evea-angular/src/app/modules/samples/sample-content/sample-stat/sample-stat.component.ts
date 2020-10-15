import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TissueTable } from 'src/app/shared/model/tissue-table';
import { ContentApiService } from '../content-api.service';
import { EChartOption } from 'echarts';
import rnaType from 'src/app/shared/constants/rna-types';
import samTypes from 'src/app/shared/constants/sam-types';
import { MappingDist } from 'src/app/shared/model/mapping-dist';
import { sortBy as _sortBy, values as _values, sum as _sum, indexOf, functions } from 'lodash-es';

@Component({
  selector: 'app-sample-stat',
  templateUrl: './sample-stat.component.html',
  styleUrls: ['./sample-stat.component.css'],
})
export class SampleStatComponent implements OnInit, OnChanges {
  @Input() tissueRecord: TissueTable;
  @Input() samType: String;
  samTypes = samTypes;
  projectDist: EChartOption;
  projectDistTitle: string;
  constructor(private contentApiService: ContentApiService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.tissueRecord);
    if (this.tissueRecord.case_n != 0 && this.tissueRecord.normal_n == 0) {
      this.samTypes = [{ label: 'Case' }];
    }
    if (this.tissueRecord.normal_n != 0) {
      this.samTypes = [{ label: 'Case' }, { label: 'Control' }];
    }
    // this.projectDistTitle = `${this.tissueRecord._id} RNA mapping distribution`;
    // this.contentApiService.getProjectStat(this.tissueRecord._id, 'Normal').subscribe((res) => {
    //   this.projectDist = this._rnaMappingDist(res, this.projectDistTitle);
    // });
    // this.contentApiService.getProjectHeatmap(this.tissueRecord._id, 'miRNA').subscribe((res) => {
    //   this.projectHeatmap = this._rnaHeatmap(res, this.projectHeatmapTitle);
    // });
  }
  // private _rnaMappingDist(d: MappingDist[], title: string): EChartOption {
  //   const series = rnaType.map((v) => ({
  //     name: v.label,
  //     type: 'bar',
  //     stack: 'total',
  //     data: [],
  //   }));

  //   d.map((v) => {
  //     const tagSum = _sum(_values(v.tag_stat));
  //     series.map((s) => {
  //       s.data.push(v.tag_stat[s.name] / tagSum);
  //     });
  //   });

  //   return {
  //     title: {
  //       show: false,
  //       text: title,
  //     },
  //     grid: {
  //       top: '10%',
  //       left: '10%',
  //       right: '2%',
  //       bottom: '10%',
  //     },
  //     toolbox: {
  //       showTitle: true,
  //       feature: {
  //         data: { show: false },
  //         saveAsImage: {
  //           title: 'Save as image',
  //         },
  //       },
  //     },
  //     tooltip: {
  //       show: true,
  //       trigger: 'axis',
  //     },
  //     legend: {
  //       data: series.map((v) => v.name),
  //     },
  //     xAxis: {
  //       type: 'category',
  //       show: true,
  //       name: 'Samples',
  //       nameLocation: 'center',
  //       nameTextStyle: { fontWeight: 'bolder' },
  //       axisTick: { show: false },
  //       axisLabel: { show: false },
  //       data: d.map((v) => `${v.srr_id} (${v.disease}, ${v.ex_type})`),
  //     },
  //     yAxis: {
  //       type: 'value',
  //       show: true,
  //       name: 'Mapping rate',
  //       nameLocation: 'center',
  //       nameTextStyle: { fontWeight: 'bolder' },
  //       nameGap: 30,
  //     },
  //     series,
  //   };
  // }

  // private _rnaHeatmap(d: RnaHeatmap[], title: string): EChartOption {
  //   let yAxis = [];
  //   const xAxis = [];
  //   const xAxis2 = [];
  //   const data = [];
  //   const data2 = [];
  //   let condition = [];
  //   // console.log(d);
  //   d.map((v) => {
  //     xAxis.push(v.srr_id);
  //     xAxis2.push({ srrId: v.srr_id, con: v.condition });
  //     condition.push(v.condition);
  //     yAxis.push(...v.mir_lst);
  //   });
  //   yAxis = [...new Set(yAxis)];
  //   condition = [...new Set(condition)];

  //   d.map((v, i) => {
  //     v.mir_lst.map((vv, ii) => {
  //       data[i * 50 + yAxis.indexOf(vv)] = [i, yAxis.indexOf(vv), v.exp_lst[ii]];
  //     });
  //   });

  //   //mean resu for each miR of single type sample
  //   const dataMean = [];
  //   let sum = 0;
  //   let dataMeanS = [];
  //   let ydata = [];
  //   if (condition.includes('Normal') && condition.length > 1) {
  //   } else {
  //     yAxis.map((v, i) => {
  //       xAxis.map((vv, ii) => {
  //         if (typeof data[ii * 50 + i] != 'undefined') {
  //           sum = data[ii * 50 + i][2] + sum;
  //         }
  //       });
  //       dataMean.push({ mean: sum / xAxis.length, mir: v });
  //       sum = 0;
  //     });
  //   }
  //   dataMeanS = dataMean.sort((a, b) => {
  //     return a.mean - b.mean;
  //   });
  //   ydata = dataMeanS.map(function (iterm) {
  //     return iterm['mir'];
  //   });

  //   //mean resu for each miR of more than 2 types sample
  //   var compare = function (obj1, obj2) {
  //     var val1 = obj1.Con;
  //     var val2 = obj2.Con;
  //     if (val1 < val2) {
  //       return -1;
  //     } else if (val1 > val2) {
  //       return 1;
  //     } else {
  //       return 0;
  //     }
  //   };

  //   let xList = [];
  //   let xListN = [];
  //   if (condition.includes('Normal') && condition.length > 1) {
  //     xAxis2.map((x, i) => {
  //       xList.push({ srrId: x.srrId, Con: x.con, Oi: i });
  //     });
  //     xList.sort(compare);
  //     xList.map((x, i) => {
  //       xListN.push({ srrId: x.srrId, Con: x.Con, Oi: x.Oi, Ni: i });
  //     });
  //     //cancer mean & normal mean
  //     let canSum = 0;
  //     let norSum = 0;
  //     let canNum = 0;
  //     let norNum = 0;
  //     let diffValue;
  //     let diffList = [];
  //     let diffListS = [];
  //     yAxis.map((y, i) => {
  //       xListN.map((x) => {
  //         if (x.Con == 'Cancer' || x.Con == 'cancer' || x.Con == 'disease') {
  //           canNum = canNum + 1;
  //           if (typeof data[x.Oi * 50 + i] != 'undefined') {
  //             canSum = data[x.Oi * 50 + i][2] + canSum; //x.Oi means xZhou, i means yZhou
  //           }
  //         } else {
  //           norNum = norNum + 1;
  //           if (typeof data[x.Oi * 50 + i] != 'undefined') {
  //             norSum = data[x.Oi * 50 + i][2] + norSum; //x.Oi means xZhou, i means yZhou
  //           }
  //         }
  //       });
  //       // diff value
  //       diffValue = canSum / canNum / (norSum / norNum);
  //       canSum = 0;
  //       norSum = 0;
  //       canNum = 0;
  //       norNum = 0;
  //       diffList.push({ diffV: diffValue, mir: y });
  //     });
  //     diffListS = diffList.sort((a, b) => {
  //       return a.diffV - b.diffV;
  //     });
  //     // console.log(diffListS);
  //     ydata = diffListS.map(function (iterm) {
  //       return iterm['mir'];
  //     });
  //   }

  //   //sorted data2
  //   d.map((v, i) => {
  //     v.mir_lst.map((vv, ii) => {
  //       data2[i * 50 + ydata.indexOf(vv)] = [i, ydata.indexOf(vv), v.exp_lst[ii]];
  //     });
  //   });

  //   //sorted data2 according xAxis
  //   xListN.map((x) => {
  //     data2.map((d) => {
  //       if (d[0] == x.Oi && !d.includes('replaced')) {
  //         d[0] = x.Ni;
  //         d.push('replaced');
  //       }
  //     });
  //   });

  //   data2.map((d) => {
  //     if (d.includes('replaced')) {
  //       d.splice(3, 1);
  //     }
  //   });
  //   // console.log(data2);

  //   //xZhou final
  //   let xAxisF = [];
  //   if (xListN.length >= 1) {
  //     xAxisF = xListN.map(function (iterm) {
  //       return iterm['srrId'];
  //     });
  //   } else {
  //     xAxisF = xAxisF.concat(xAxis);
  //   }

  //   //quartile data for the range of the visualMap
  //   let qArray = [];
  //   d.map((q) => {
  //     qArray = qArray.concat(q.exp_lst);
  //   });
  //   qArray.sort(function (a, b) {
  //     return a - b;
  //   });
  //   let qValue = qArray[Math.ceil(qArray.length / 4) * 3];

  //   return {
  //     title: {
  //       show: true,
  //       text: 'Samples',
  //       left: 'center',
  //       bottom: '7%',
  //     },
  //     grid: {
  //       height: '600px',
  //       top: '3%',
  //       left: '13%',
  //       right: '2%',
  //       // bottom: '3%',
  //     },
  //     toolbox: {
  //       showTitle: true,
  //       feature: {
  //         data: { show: false },
  //         saveAsImage: {
  //           title: 'Save as image',
  //         },
  //       },
  //     },
  //     tooltip: {
  //       show: true,
  //     },
  //     xAxis: {
  //       type: 'category',
  //       axisTick: { show: false },
  //       splitArea: { show: true },
  //       data: xAxisF,
  //       axisLabel: {
  //         show: false,
  //       },
  //     },
  //     yAxis: {
  //       type: 'category',
  //       axisTick: { show: false },
  //       splitArea: { show: true },
  //       data: ydata,
  //       axisLabel: {
  //         interval: 0,
  //       },
  //     },
  //     visualMap: {
  //       min: 0,
  //       max: qValue,
  //       calculable: true,
  //       orient: 'horizontal',
  //       left: 'center',
  //       bottom: '1%',
  //     },
  //     series: [
  //       {
  //         name: 'Sample ID',
  //         type: 'heatmap',
  //         data: data2,
  //         label: { show: false },
  //         emphasis: {
  //           itemStyle: {
  //             shadowBlur: 10,
  //             shadowColor: 'rgba(0, 0, 0, 0.5)',
  //           },
  //         },
  //       },
  //     ],
  //   };
  // }
}
