import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mirna-function',
  templateUrl: './mirna-function.component.html',
  styleUrls: ['./mirna-function.component.css'],
})
export class MirnaFunctionComponent implements OnInit {
  @Input() rnaSymbol: string;
  @Input() rnaType: string;

  constructor() {}

  ngOnInit(): void {}
}
