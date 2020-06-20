import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rna-table',
  templateUrl: './rna-table.component.html',
  styleUrls: ['./rna-table.component.css'],
})
export class RnaTableComponent implements OnInit {
  @Input() rnaType: string;

  constructor() {}

  ngOnInit(): void {}
}
