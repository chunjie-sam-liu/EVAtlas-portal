import { Component, OnInit, Input } from '@angular/core';
import { TissueTable } from 'src/app/shared/model/tissue-table';
import rnaTypes from 'src/app/shared/constants/rna-types';

@Component({
  selector: 'app-sample-rna-avg',
  templateUrl: './sample-rna-avg.component.html',
  styleUrls: ['./sample-rna-avg.component.css'],
})
export class SampleRnaAvgComponent implements OnInit {
  @Input() tissueRecord: TissueTable;
  rnaTypes = rnaTypes;

  constructor() {}

  ngOnInit(): void {}
}
