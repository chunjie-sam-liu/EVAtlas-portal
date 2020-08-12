import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { EChartOption } from 'echarts';
import * as echarts from 'echarts';
import { RnaDetailApiService } from '../rna-detail-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MirFunc } from 'src/app/shared/model/mir-func';
import { MatPaginator } from '@angular/material/paginator';
import { TcgaMir } from 'src/app/shared/model/tcga-mir';

@Component({
  selector: 'app-rna-misc',
  templateUrl: './rna-misc.component.html',
  styleUrls: ['./rna-misc.component.css']
})
export class RnaMiscComponent implements OnInit {
  @Input() rnaSymbol: string;
  @Input() rnaType: string;

  tcgaExp: EChartOption;
  tcgaExpTitle: string;

  dataSourceFunc: MatTableDataSource<MirFunc>;
  @ViewChild('paginatorFunc', { static: true }) paginatorFunc: MatPaginator;
  displayedColumnsFunc=['miRNA id', 'miRNA Function', 'Pubmed'];

  constructor(private rnaDetailApiService: RnaDetailApiService) { }

  ngOnInit(): void {
    this.tcgaExpTitle=`${this.rnaSymbol} from TCGA average expression across cancers`;

    this.rnaDetailApiService.findtcgaExpr(this.rnaSymbol).subscribe((res) => {
      console.log(res);
      this.tcgaExp=this._plotDist(res, this.tcgaExpTitle, this.rnaSymbol);
    });

    let rnaSymbolSub=this.rnaSymbol.replace(/-[3|5]p/, "");
    this.rnaDetailApiService.getmiRNAFuncs(rnaSymbolSub).subscribe((res) => {
      this.dataSourceFunc=new MatTableDataSource(res);
      this.dataSourceFunc.paginator=this.paginatorFunc;
    });
  }
  private _plotDist(d: TcgaMir[], title: string, r: string): EChartOption {
    const source=[];
    let sam;
    let test_source=[]
    d.map((t, i) => {
      for (var dise in t) {
        sam=dise.split("_");
        let push_data={};
        push_data['Sample']=sam[0];
        push_data[sam[1]]=sam[dise];
        test_source.push(push_data);
        for (var re in test_source) {
          // console.log(test_source[re]['Sample']);
          if (test_source[re]['Sample']==sam[0]&&re.length<3) {//判断source的对象中是否已经包含了该疾病
            test_source[re][sam[1]]=t[dise];//将该疾病的normal或者case值加入到source的对象中
          }
        }
      }
    });
    function getObjectLength(obj) {
      var i=0;
      for (var k in obj) {
        i++;
      }
      return i;
    };//计算每个对象的长度
    let i=test_source.length;
    while (i--) {
      if (getObjectLength(test_source[i])==2) {
        test_source.splice(i, 1);
      }
    };//删除对象元素小于2的对象
    console.log(test_source);
    const diseSource=[];
    const caseSource=[];
    const normSource=[];
    var compare=function (obj1, obj2) {
      var val1=obj1.Sample;
      var val2=obj2.Sample;
      if (val1<val2) {
        return -1;
      } else if (val1>val2) {
        return 1;
      } else {
        return 0;
      }
    };
    test_source.sort(compare);
    test_source.map((sam) => {
      for (var i in sam) {//i为key,sam[i]为value
        if (i=="Sample") {
          diseSource.push(sam[i]);
        } else if (i=="normal") {
          normSource.push(sam[i]);
        } else {
          caseSource.push(sam[i]);
        }
      }
    });

    return {
      title: {
      },
      toolbox: {
        showTtile: true,
        feature: {
          data: { show: false },
          saveAsImage: { title: 'Save as image' },
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['Case', 'Normal']
      },
      grid: {
        height: "650px",
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
      },
      yAxis: {
        type: 'category',
        data: diseSource
      },
      series: [
        {
          name: 'Case',
          type: 'bar',
          data: caseSource,
          // barWidth: 50
        },
        {
          name: 'Normal',
          type: 'bar',
          data: normSource,
          // barWidth: 50
        }
      ]
    };
  };
}
