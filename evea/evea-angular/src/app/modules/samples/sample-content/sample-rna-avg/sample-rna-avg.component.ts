import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TissueTable } from 'src/app/shared/model/tissue-table';
import { ContentApiService } from '../content-api.service';
import rnaTypes from 'src/app/shared/constants/rna-types';
import { EChartOption } from 'echarts';
import { sortBy as _sortBy, values as _values, sum as _sum, indexOf, functions } from 'lodash-es';
import { RnaHeatmap } from 'src/app/shared/model/rna-heatmap';

@Component({
  selector: 'app-sample-rna-avg',
  templateUrl: './sample-rna-avg.component.html',
  styleUrls: ['./sample-rna-avg.component.css'],
})
export class SampleRnaAvgComponent implements OnInit, OnChanges {
  @Input() tissueRecord: TissueTable;
  @Input() sample: any;
  rnaTypes = rnaTypes;

  constructor(private contentApiService: ContentApiService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {}
}
