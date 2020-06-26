import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TissueTable } from 'src/app/shared/model/tissue-table';
import { ContentApiService } from '../content-api.service';

@Component({
  selector: 'app-sample-stat',
  templateUrl: './sample-stat.component.html',
  styleUrls: ['./sample-stat.component.css'],
})
export class SampleStatComponent implements OnInit, OnChanges {
  @Input() tissueRecord: TissueTable;

  constructor(private contentApiService: ContentApiService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.tissueRecord);
  }
}
