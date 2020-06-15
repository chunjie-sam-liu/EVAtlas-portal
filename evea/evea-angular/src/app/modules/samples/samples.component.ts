import { Component, OnInit } from '@angular/core';
import samples from 'src/app/shared/constants/samples';

@Component({
  selector: 'app-samples',
  templateUrl: './samples.component.html',
  styleUrls: ['./samples.component.css'],
})
export class SamplesComponent implements OnInit {
  public samples = samples;

  public showSample(sample: any): void {
    console.log(sample);
  }
  constructor() {}

  ngOnInit(): void {}
}
