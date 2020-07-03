import { Component, OnInit } from '@angular/core';

import samples from 'src/app/shared/constants/samples';

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

  constructor() {}

  ngOnInit(): void {}

  public showContent(sample: any): void {
    this.sample = sample;
    this.showStatistics = sample.name === 'stat' ? true : false;
    this.showSample = !this.showStatistics;
  }
}
