import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface PeriodicElement {
  EV_type: string;
  Source: string;
  Cancer_Source_type: string;
  Specific_miRNA_counts: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { Source: 'Source', EV_type: 'EXO', Cancer_Source_type: 'Adipose', Specific_miRNA_counts: 'xx' },
  { Source: 'Source', EV_type: 'EXO', Cancer_Source_type: 'Adrenal gland', Specific_miRNA_counts: 'xx' },
  { Source: 'Source', EV_type: 'MV', Cancer_Source_type: 'Bladder', Specific_miRNA_counts: 'xx' },
  { Source: 'Blood', EV_type: 'EXO', Cancer_Source_type: 'Blood', Specific_miRNA_counts: 'xx' },
  { Source: 'Cancer', EV_type: 'EXO', Cancer_Source_type: 'Bone', Specific_miRNA_counts: 'xx' },
  { Source: 'Cancer', EV_type: 'EXO', Cancer_Source_type: 'Bone_marrow', Specific_miRNA_counts: 'xx' },
  { Source: 'Cancer', EV_type: 'EXO', Cancer_Source_type: 'Brain', Specific_miRNA_counts: 'xx' },
  { Source: 'Cancer', EV_type: 'EXO', Cancer_Source_type: 'Breast', Specific_miRNA_counts: 'xx' },
  { Source: 'Cancer', EV_type: 'EXO', Cancer_Source_type: 'Cervix', Specific_miRNA_counts: 'xx' },
  { Source: 'Cancer', EV_type: 'EXO', Cancer_Source_type: 'Colorectum', Specific_miRNA_counts: 'xx' },
];

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css'],
})
export class DocumentComponent implements OnInit {
  displayedColumns: string[] = ['Source', 'EV_type', 'Cancer_Source_type', 'Specific_miRNA_counts'];
  dataSource = ELEMENT_DATA;

  public assets = environment.assets;

  constructor() {}

  ngOnInit(): void {}
}
