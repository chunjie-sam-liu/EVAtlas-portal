import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-sample-card',
  templateUrl: './sample-card.component.html',
  styleUrls: ['./sample-card.component.css'],
})
export class SampleCardComponent implements OnInit {
  // samples input
  @Input() sample: any;
  // sources inputt
  @Input() source: any;

  public assets = environment.assets;

  constructor() {}

  ngOnInit(): void {}
}
