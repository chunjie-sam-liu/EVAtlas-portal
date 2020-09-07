import { Component, OnInit, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { EChartOption } from 'echarts';
import { RnaDetailApiService } from '../rna-detail-api.service';
import { MatPaginator } from '@angular/material/paginator';
import { TcgaMir } from 'src/app/shared/model/tcga-mir';
import { merge, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
// import { merge } from 'lodash';
import { RnaFuncDataSrouce } from './rna-func-data-source';

@Component({
  selector: 'app-rna-misc',
  templateUrl: './rna-misc.component.html',
  styleUrls: ['./rna-misc.component.css'],
})
export class RnaMiscComponent implements OnInit, AfterViewInit {
  @Input() rnaSymbol: string;
  @Input() rnaType: string;

  tcgaExp: EChartOption;
  tcgaExpTitle: string;

  isMirna: boolean;
  isTcgaExp: boolean;

  dataSourceFunc: RnaFuncDataSrouce;
  @ViewChild('paginatorFunc') paginatorFunc: MatPaginator;
  @ViewChild('input') input: ElementRef;
  displayedColumnsFunc = ['miRNA_id', 'mir_function', 'pubmed_id'];

  constructor(private rnaDetailApiService: RnaDetailApiService) {}

  ngOnInit(): void {
    this.tcgaExpTitle = `${this.rnaSymbol} from TCGA average expression across cases vs normals`;

    // if (this.rnaSymbol.indexOf('#') != -1) {
    //   this.rnaSymbol = this.rnaSymbol.replace(/\#.*/, '');
    //   console.log(this.rnaSymbol);
    // }
    this.rnaDetailApiService.findtcgaExpr(this.rnaSymbol, this.rnaType).subscribe((res) => {
      this.isTcgaExp = res.length != 0 ? true : false;
      this.tcgaExp = this._plotDist(res, this.tcgaExpTitle, this.rnaSymbol);
    });

    const rnaSymbolSub = this.rnaSymbol.replace(/-[3|5]p/, '');
    this.dataSourceFunc = new RnaFuncDataSrouce(this.rnaDetailApiService);
    this.dataSourceFunc.loadFuncRecords(rnaSymbolSub, '', 0, 5);
    this.isMirna = this.rnaType === 'miRNA' ? true : false;
  }

  ngAfterViewInit(): void {
    console.log(this.paginatorFunc);
    this.paginatorFunc.page.pipe(tap(() => this._loadFuncRecords()));
    merge(this.paginatorFunc.page)
      .pipe(tap(() => this._loadFuncRecords()))
      .subscribe();

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginatorFunc.pageIndex = 0;
          this._loadFuncRecords();
        })
      )
      .subscribe();
  }

  private _loadFuncRecords() {
    this.dataSourceFunc.loadFuncRecords(
      this.rnaSymbol.replace(/-[3|5]p/, ''),
      this.input.nativeElement.value,
      this.paginatorFunc.pageIndex,
      this.paginatorFunc.pageSize
    );
  }

  private _plotDist(d: TcgaMir[], title: string, r: string): EChartOption {
    const source = [];
    let sam;
    // tslint:disable-next-line: variable-name
    const test_source = [];
    // tslint:disable-next-line: no-shadowed-variable
    d.map((t, i) => {
      // tslint:disable-next-line: forin
      for (const dise in t) {
        sam = dise.split('_');
        // tslint:disable-next-line: variable-name
        const push_data = {};
        // tslint:disable-next-line: no-string-literal
        push_data['Sample'] = sam[0];
        push_data[sam[1]] = sam[dise];
        test_source.push(push_data);
        for (const re in test_source) {
          // console.log(test_source[re]['Sample']);
          if (test_source[re].Sample === sam[0] && re.length < 3) {
            // 判断source的对象中是否已经包含了该疾病
            test_source[re][sam[1]] = t[dise]; // 将该疾病的normal或者case值加入到source的对象中
          }
        }
      }
    });
    function getObjectLength(obj) {
      // tslint:disable-next-line: no-shadowed-variable
      let i = 0;
      // tslint:disable-next-line: forin
      for (const k in obj) {
        i++;
      }
      return i;
    } // 计算每个对象的长度
    let i = test_source.length;
    while (i--) {
      if (getObjectLength(test_source[i]) === 2) {
        test_source.splice(i, 1);
      }
    } // 删除对象元素小于2的对象
    const diseSource = [];
    const caseSource = [];
    const normSource = [];
    // tslint:disable-next-line: only-arrow-functions
    const compare = (obj1, obj2) => {
      const val1 = obj1.Sample;
      const val2 = obj2.Sample;
      if (val1 < val2) {
        return -1;
      } else if (val1 > val2) {
        return 1;
      } else {
        return 0;
      }
    };
    test_source.sort(compare);
    // tslint:disable-next-line: no-shadowed-variable
    test_source.map((sam) => {
      // tslint:disable-next-line: no-shadowed-variable
      for (const i in sam) {
        // i为key,sam[i]为value
        if (i === 'Sample') {
          diseSource.push(sam[i]);
        } else if (i === 'normal') {
          normSource.push(sam[i]);
        } else {
          caseSource.push(sam[i]);
        }
      }
    });

    return {
      title: {},
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
          type: 'shadow',
        },
      },
      legend: {
        data: ['Case', 'Normal'],
      },
      grid: {
        height: '650px',
        left: '1%',
        right: '9%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
        name: `RPKM`,
      },
      yAxis: {
        type: 'category',
        data: diseSource,
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
        },
      ],
    };
  }
}
