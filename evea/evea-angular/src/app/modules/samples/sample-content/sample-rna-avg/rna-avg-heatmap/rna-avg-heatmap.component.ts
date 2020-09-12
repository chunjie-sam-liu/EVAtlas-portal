import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { EChartOption } from 'echarts';
import { TissueTable } from 'src/app/shared/model/tissue-table';
import { ContentApiService } from '../../content-api.service';
import { RnaHeatmap } from 'src/app/shared/model/rna-heatmap';

@Component({
  selector: 'app-rna-avg-heatmap',
  templateUrl: './rna-avg-heatmap.component.html',
  styleUrls: ['./rna-avg-heatmap.component.css'],
})
export class RnaAvgHeatmapComponent implements OnInit, OnChanges {
  @Input() rnaType: string;
  @Input() tissueRecord: TissueTable;

  projectHeatmap: EChartOption;
  projectHeatmapTitle: string;

  constructor(private contentApiService: ContentApiService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.projectHeatmapTitle = `${this.tissueRecord._id} miRNA Heatmap (top 50)`;
    this.contentApiService.getProjectHeatmap(this.tissueRecord._id, this.rnaType).subscribe((res) => {
      console.log(this.rnaType);
      console.log(res);
      this.projectHeatmap = this._rnaHeatmap(res, this.projectHeatmapTitle);
    });
  }

  private _rnaHeatmap(d: RnaHeatmap[], title: string): EChartOption {
    let yAxis = [];
    const xAxis = [];
    const xAxis2 = [];
    const data = [];
    const data2 = [];
    let condition = [];
    let conditionA = [];
    // console.log(d);
    d.map((v) => {
      xAxis.push(v.srr_id);
      xAxis2.push({ srrId: v.srr_id, con: v.condition });
      conditionA.push(v.condition);
      yAxis.push(...v.mir_lst);
    });
    yAxis = [...new Set(yAxis)];
    condition = [...new Set(conditionA)];
    conditionA = conditionA.sort();

    d.map((v, i) => {
      let mir_lst_len = v.mir_lst.length;
      v.mir_lst.map((vv, ii) => {
        data[i * mir_lst_len + yAxis.indexOf(vv)] = [i, yAxis.indexOf(vv), v.exp_lst[ii]];
      });
    });
    console.log(data);

    //mean resu for each miR of single type sample
    const dataMean = [];
    let sum = 0;
    let dataMeanS = [];
    let ydata = [];
    if (condition.includes('Normal') && condition.length > 1) {
    } else {
      yAxis.map((v, i) => {
        xAxis.map((vv, ii) => {
          if (typeof data[ii * 50 + i] != 'undefined') {
            sum = data[ii * 50 + i][2] + sum;
          }
        });
        dataMean.push({ mean: sum / xAxis.length, mir: v });
        sum = 0;
      });
    }
    dataMeanS = dataMean.sort((a, b) => {
      return a.mean - b.mean;
    });
    ydata = dataMeanS.map(function (iterm) {
      return iterm['mir'];
    });

    //mean resu for each miR of more than 2 types sample
    var compare = function (obj1, obj2) {
      var val1 = obj1.Con;
      var val2 = obj2.Con;
      if (val1 < val2) {
        return -1;
      } else if (val1 > val2) {
        return 1;
      } else {
        return 0;
      }
    };

    let xList = [];
    let xListN = [];
    if (condition.includes('Normal') && condition.length > 1) {
      xAxis2.map((x, i) => {
        xList.push({ srrId: x.srrId, Con: x.con, Oi: i });
      });
      xList.sort(compare);
      xList.map((x, i) => {
        xListN.push({ srrId: x.srrId, Con: x.Con, Oi: x.Oi, Ni: i });
      });
      //cancer mean & normal mean
      let canSum = 0;
      let norSum = 0;
      let canNum = 0;
      let norNum = 0;
      let diffValue;
      let diffList = [];
      let diffListS = [];
      yAxis.map((y, i) => {
        xListN.map((x) => {
          if (x.Con == 'Cancer' || x.Con == 'cancer' || x.Con == 'disease') {
            canNum = canNum + 1;
            if (typeof data[x.Oi * 50 + i] != 'undefined') {
              canSum = data[x.Oi * 50 + i][2] + canSum; //x.Oi means xZhou, i means yZhou
            }
          } else {
            norNum = norNum + 1;
            if (typeof data[x.Oi * 50 + i] != 'undefined') {
              norSum = data[x.Oi * 50 + i][2] + norSum; //x.Oi means xZhou, i means yZhou
            }
          }
        });
        // diff value
        diffValue = canSum / canNum / (norSum / norNum);
        canSum = 0;
        norSum = 0;
        canNum = 0;
        norNum = 0;
        diffList.push({ diffV: diffValue, mir: y });
      });
      diffListS = diffList.sort((a, b) => {
        return a.diffV - b.diffV;
      });
      // console.log(diffListS);
      ydata = diffListS.map(function (iterm) {
        return iterm['mir'];
      });
    }

    //sorted data2
    d.map((v, i) => {
      v.mir_lst.map((vv, ii) => {
        data2[i * 50 + ydata.indexOf(vv)] = [i, ydata.indexOf(vv), v.exp_lst[ii]];
      });
    });

    //sorted data2 according xAxis
    xListN.map((x) => {
      data2.map((d) => {
        if (d[0] == x.Oi && !d.includes('replaced')) {
          d[0] = x.Ni;
          d.push('replaced');
        }
      });
    });

    data2.map((d) => {
      if (d.includes('replaced')) {
        d.splice(3, 1);
      }
    });
    console.log(data2);

    //xZhou final
    let xAxisF = [];
    if (xListN.length >= 1) {
      xAxisF = xListN.map(function (iterm) {
        return iterm['srrId'];
      });
    } else {
      xAxisF = xAxisF.concat(xAxis);
    }

    //quartile data for the range of the visualMap
    let qArray = [];
    d.map((q) => {
      qArray = qArray.concat(q.exp_lst);
    });
    qArray.sort(function (a, b) {
      return a - b;
    });
    let qValue = qArray[Math.ceil(qArray.length / 4) * 3];

    return {
      title: {
        show: true,
        text: 'Samples',
        left: 'center',
        bottom: '7%',
      },
      grid: {
        height: '600px',
        top: '3%',
        left: '13%',
        right: '2%',
        // bottom: '3%',
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
        trigger: 'axis',
        formatter: function (params, ticket, callback) {
          var htmlStr = '';
          for (var i = 0; i < params.length; i++) {
            var param = params[i];
            var xName = param.name; //x轴的名称
            var seriesName = param.seriesName; //图例名称
            var value = param.value; //y轴值
            var color = param.color; //图例颜色
            var yZhou = ydata[i];

            if (i === 0) {
              htmlStr += 'Sample id: ' + xName + '<br/>'; //x轴的名称
            }
            htmlStr += '<div>';

            // 具体显示的数据【字段名称：seriesName，值：value】
            // 这里判断一下name，如果是我们需要特殊处理的，就处理
            if (seriesName === 'condition') {
              // 前面一条线，后面一条线【具体样式自己写】
              htmlStr += '<div style="border: 1px solid #FFEB3B"></div>';
              htmlStr += 'Condition：' + value;
              htmlStr += '<div style="border: 1px solid #FFEB3B"></div>';
            }
            // else {
            //   // 正常显示的数据，走默认
            //   htmlStr+='<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:'+color+';"></span>';
            //   htmlStr+=yZhou+'：'+value[2];
            // }

            htmlStr += '</div>';
          }
          return htmlStr;
        },
      },
      xAxis: {
        type: 'category',
        axisTick: { show: false },
        splitArea: { show: true },
        data: xAxisF,
        axisLabel: {
          show: false,
        },
      },
      yAxis: {
        type: 'category',
        axisTick: { show: false },
        splitArea: { show: true },
        data: ydata,
        axisLabel: {
          interval: 0,
        },
      },
      visualMap: {
        min: 0,
        max: qValue,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '1%',
      },
      series: [
        {
          name: 'Sample ID',
          type: 'heatmap',
          data: data2,
          label: { show: false },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
        {
          name: 'condition',
          data: conditionA,
          type: 'line',
        },
      ],
    };
  }
}
