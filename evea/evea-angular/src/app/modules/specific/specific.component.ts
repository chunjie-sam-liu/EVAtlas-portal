import { Component, OnInit } from '@angular/core';
import SpeTissue from 'src/app/shared/constants/spe-tissue';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-specific',
  templateUrl: './specific.component.html',
  styleUrls: ['./specific.component.css'],
})
export class SpecificComponent implements OnInit {
  // 30% part
  assets = environment.assets;
  exos = SpeTissue.exo;
  mvs = SpeTissue.mv;

  // content part
  contentTissue = this.exos[0];
  constructor() {}

  ngOnInit(): void {}

  public showContent(tissue: any): void {
    this.contentTissue = tissue;
  }
}
