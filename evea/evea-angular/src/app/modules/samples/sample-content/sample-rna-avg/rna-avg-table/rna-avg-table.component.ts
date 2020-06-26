import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TissueTable } from 'src/app/shared/model/tissue-table';
import { ContentApiService } from '../../content-api.service';

@Component({
  selector: 'app-rna-avg-table',
  templateUrl: './rna-avg-table.component.html',
  styleUrls: ['./rna-avg-table.component.css'],
})
export class RnaAvgTableComponent implements OnInit, OnChanges {
  @Input() rnaType: string;
  @Input() tissueRecord: TissueTable;
  constructor(private contentApiService: ContentApiService) {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {}
}
