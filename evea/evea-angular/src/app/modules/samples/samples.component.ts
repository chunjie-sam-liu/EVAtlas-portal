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
  public showContet = !this.showStatistics;

  constructor() {}

  ngOnInit(): void {}

  public showSample(sample: any): void {
    this.showStatistics = sample.name === 'stat' ? true : false;
    this.showContet = !this.showStatistics;

    this.sample = sample;
    console.log(this.sample);
  }
}
