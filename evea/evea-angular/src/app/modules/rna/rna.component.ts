import { Component, OnInit } from '@angular/core';

import rnaTypes from 'src/app/shared/constants/rna-types';

@Component({
  selector: 'app-rna',
  templateUrl: './rna.component.html',
  styleUrls: ['./rna.component.css'],
})
export class RnaComponent implements OnInit {
  rnaTypes = rnaTypes;
  constructor() {}

  ngOnInit(): void {}
}
