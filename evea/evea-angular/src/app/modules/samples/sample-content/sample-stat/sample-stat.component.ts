import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TissueTable } from 'src/app/shared/model/tissue-table';
import { ContentApiService } from '../content-api.service';
import { EChartOption } from 'echarts';

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
    this.projectDistTitle = `${this.tissueRecord._id}`;

    this.contentApiService.getProjectStat(this.tissueRecord._id).subscribe((res) => {
      console.log(res);
    });
  }
}
