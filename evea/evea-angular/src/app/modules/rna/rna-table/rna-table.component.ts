import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rna-table',
  templateUrl: './rna-table.component.html',
  styleUrls: ['./rna-table.component.css'],
})
export class RnaTableComponent implements OnInit {
  @Input() rnaType: string;

  displayedColumns = ['seqNo', 'description', 'duration'];

  constructor() {}

  ngOnInit(): void {}

  onRowClicked(row: any) {
    console.log('Row clicked: ', row);
  }
}
