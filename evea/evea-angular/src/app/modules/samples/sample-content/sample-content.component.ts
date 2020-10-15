import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ContentApiService } from './content-api.service';
import { Observable } from 'rxjs';
import { TissueTable } from 'src/app/shared/model/tissue-table';

@Component({
  selector: 'app-sample-content',
  templateUrl: './sample-content.component.html',
  styleUrls: ['./sample-content.component.css'],
})
export class SampleContentComponent implements OnInit, OnChanges {
  @Input() sample: any;
  showProject = false;
  tissueTable$: Observable<TissueTable[]>;
  tissueRecord: TissueTable;

  constructor(private contentApiService: ContentApiService) {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    this.tissueTable$ = this.contentApiService.getTissueTable(this.sample.select, changes.sample.currentValue.title);
    // console.log(this.sample);
    this.showProject = false;
  }

  public displayTissueStat(tissue: TissueTable): void {
    this.showProject = true;
    this.tissueRecord = tissue;
  }
}
