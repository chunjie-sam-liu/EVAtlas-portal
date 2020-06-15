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

  constructor() {}

  ngOnInit(): void {}

  public showSample(sample: {}): void {
    console.log(sample);
  }
}
