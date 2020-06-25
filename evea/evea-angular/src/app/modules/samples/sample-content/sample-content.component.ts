import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ContentApiService } from './content-api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sample-content',
  templateUrl: './sample-content.component.html',
  styleUrls: ['./sample-content.component.css'],
})
export class SampleContentComponent implements OnInit, OnChanges {
  @Input() sample: any;

  tissueContent: Observable<any[]>;

  constructor(private contentApiService: ContentApiService) {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    this.tissueContent = this.contentApiService.getTissueContent('Exosomes', changes.sample.currentValue.name);
    console.log(this.tissueContent);
  }
}
