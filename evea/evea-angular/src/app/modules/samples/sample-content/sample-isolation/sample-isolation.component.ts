import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TissueTable } from 'src/app/shared/model/tissue-table';

@Component({
  selector: 'app-sample-isolation',
  templateUrl: './sample-isolation.component.html',
  styleUrls: ['./sample-isolation.component.css'],
})
export class SampleIsolationComponent implements OnInit, OnChanges {
  @Input() tissueRecord: TissueTable;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {}
}
