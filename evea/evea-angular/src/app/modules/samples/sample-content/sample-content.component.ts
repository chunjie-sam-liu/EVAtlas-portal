import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sample-content',
  templateUrl: './sample-content.component.html',
  styleUrls: ['./sample-content.component.css'],
})
export class SampleContentComponent implements OnInit {
  @Input() sample: any;

  constructor() {}

  ngOnInit(): void {}
}
