import { Component, OnInit } from '@angular/core';
import SpeTissue from 'src/app/shared/constants/spe-tissue';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-specific',
  templateUrl: './specific.component.html',
  styleUrls: ['./specific.component.css'],
})
export class SpecificComponent implements OnInit {
  assets = environment.assets;
  exos = SpeTissue.exo;
  mvs = SpeTissue.mv;

  constructor() {}

  ngOnInit(): void {}
}
