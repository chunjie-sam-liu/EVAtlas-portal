import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RnaBasicInfo } from 'src/app/shared/model/rna-basic-info';

@Component({
  selector: 'app-rna-basic-info',
  templateUrl: './rna-basic-info.component.html',
  styleUrls: ['./rna-basic-info.component.css'],
})
export class RnaBasicInfoComponent implements OnInit {
  @Input() rnaSymbol: string;
  @Input() rnaBasicInfo: RnaBasicInfo;

  rnaSymbolShow: string;

  constructor() {}

  ngOnInit(): void {
    this.rnaSymbolShow = this.rnaSymbol.replace(/\#.*/, '');
    console.log(this.rnaSymbolShow);
  }
}
