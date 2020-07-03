import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TissueTable } from 'src/app/shared/model/tissue-table';
import { ContentApiService } from '../content-api.service';
import { Observable } from 'rxjs';
import { ISOMethod } from 'src/app/shared/model/iso-method';

@Component({
  selector: 'app-sample-isolation',
  templateUrl: './sample-isolation.component.html',
  styleUrls: ['./sample-isolation.component.css'],
})
export class SampleIsolationComponent implements OnInit, OnChanges {
  @Input() tissueRecord: TissueTable;
  isoMethod$: Observable<ISOMethod>;

  constructor(private contentApiService: ContentApiService) {}

  ngOnInit(): void {
    this.isoMethod$ = this.contentApiService.getIsoMethod(this.tissueRecord._id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isoMethod$ = this.contentApiService.getIsoMethod(this.tissueRecord._id);
    // this.contentApiService.getIsoMethod(this.tissueRecord._id).subscribe((res) => console.log(res));
  }
}
