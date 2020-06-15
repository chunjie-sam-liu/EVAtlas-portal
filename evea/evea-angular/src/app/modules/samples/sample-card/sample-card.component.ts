import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sample-card',
  templateUrl: './sample-card.component.html',
  styleUrls: ['./sample-card.component.css'],
})
export class SampleCardComponent implements OnInit {
  @Input() sample: any;

  constructor() {}

  ngOnInit(): void {}
}
