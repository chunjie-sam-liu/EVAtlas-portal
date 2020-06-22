import { Component, OnInit } from '@angular/core';

import { SampleApiService } from './sample-api.service';

import samples from 'src/app/shared/constants/samples';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-samples',
  templateUrl: './samples.component.html',
  styleUrls: ['./samples.component.css'],
})
export class SamplesComponent implements OnInit {
  // samples from constant
  public samples = samples;
  public sample: any;

  public showStatistics = true;
  public showSample = !this.showStatistics;

  public sampleSubscription: Subscription;

  constructor(private sampleApiService: SampleApiService) {}

  ngOnInit(): void {}

  public showContent(sample: any): void {
    this.sample = sample;
    this.showStatistics = sample.name === 'stat' ? true : false;
    this.showSample = !this.showStatistics;

    this.showStatistics ? this.getStatistics() : this.getSample(sample.name);
  }

  public getSample(sampleName: string) {
    console.log(sampleName);
    this.sampleSubscription = this.sampleApiService.getSample(sampleName).subscribe((s) => {
      console.log(s);
    });
  }

  public getStatistics() {
    // console.log(this.sample);
  }
}
