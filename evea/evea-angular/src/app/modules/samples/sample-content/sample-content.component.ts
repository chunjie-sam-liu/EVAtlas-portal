import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SampleApiService } from '../sample-api.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sample-content',
  templateUrl: './sample-content.component.html',
  styleUrls: ['./sample-content.component.css'],
})
export class SampleContentComponent implements OnInit, OnDestroy {
  @Input() sample: any;

  constructor(private sampleApiService: SampleApiService) {}

  public sampleSubscription: Subscription;

  ngOnInit(): void {
    console.log(this.sample);
    this.getSample();
  }

  ngOnDestroy(): void {
    this.sampleSubscription.unsubscribe();
  }

  public getSample() {
    this.sampleSubscription = this.sampleApiService.getSample().subscribe((s) => {
      console.log(s);
    });
  }
}
