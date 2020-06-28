import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-spe-content',
  templateUrl: './spe-content.component.html',
  styleUrls: ['./spe-content.component.css'],
})
export class SpeContentComponent implements OnInit, OnChanges {
  @Input() tissue: any;
  constructor() {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.tissue);
  }
}
