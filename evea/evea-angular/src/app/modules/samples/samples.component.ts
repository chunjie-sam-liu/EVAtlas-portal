import { Component, OnInit } from '@angular/core';

import samples from 'src/app/shared/constants/samples';
import sources from 'src/app/shared/constants/sources';

@Component({
  selector: 'app-samples',
  templateUrl: './samples.component.html',
  styleUrls: ['./samples.component.css'],
})
export class SamplesComponent implements OnInit {
  // samples from constant
  public samples=samples;
  public sample: any;

  // sample sources from constant
  public sources=sources;
  public source: any;

  //layout params
  public testSam="99%";
  public testResu="1%";

  public showStatistics=true;
  public showSample=!this.showStatistics;

  constructor() { }

  ngOnInit(): void { }

  public showContent(sample: any): void {
    this.sample=sample;
    this.testSam="30%";
    this.testResu="70%";
    this.showStatistics=sample.name==='stat'? true:false;
    this.showSample=!this.showStatistics;
  }
}
