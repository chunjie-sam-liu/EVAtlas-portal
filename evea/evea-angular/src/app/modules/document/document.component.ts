import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface PeriodicElement {
  EV_type: string;
  Source: string;
  Cancer_Source_type: string;
  Specific_miRNA_counts: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { Source: '1', EV_type: 'Exosome', Cancer_Source_type: 'Adipose', Specific_miRNA_counts: '57' },
  { Source: '2', EV_type: 'Exosome', Cancer_Source_type: 'Adrenal gland', Specific_miRNA_counts: '30' },
  { Source: '3', EV_type: 'Exosome', Cancer_Source_type: 'Blood', Specific_miRNA_counts: '127' },
  { Source: '4', EV_type: 'Exosome', Cancer_Source_type: 'Bone', Specific_miRNA_counts: '43' },
  { Source: '5', EV_type: 'Exosome', Cancer_Source_type: 'Bone marrow', Specific_miRNA_counts: '263' },
  { Source: '6', EV_type: 'Microvesicle', Cancer_Source_type: 'Bone marrow', Specific_miRNA_counts: '333' },
  { Source: '7', EV_type: 'Exosome', Cancer_Source_type: 'Brain', Specific_miRNA_counts: '155' },
  { Source: '8', EV_type: 'Microvesicle', Cancer_Source_type: 'Brain', Specific_miRNA_counts: '78' },
  { Source: '9', EV_type: 'Exosome', Cancer_Source_type: 'Breast', Specific_miRNA_counts: '227' },
  { Source: '10', EV_type: 'Microvesicle', Cancer_Source_type: 'Breast', Specific_miRNA_counts: '43' },
  { Source: '11', EV_type: 'Exosome', Cancer_Source_type: 'Cervix', Specific_miRNA_counts: '251' },
  { Source: '12', EV_type: 'Exosome', Cancer_Source_type: 'Colorectum', Specific_miRNA_counts: '20' },
  { Source: '13', EV_type: 'Microvesicle', Cancer_Source_type: 'Colorectum', Specific_miRNA_counts: '57' },
  { Source: '14', EV_type: 'Exosome', Cancer_Source_type: 'Epididymal', Specific_miRNA_counts: '412' },
  { Source: '15', EV_type: 'Exosome', Cancer_Source_type: 'Hypopharynx', Specific_miRNA_counts: '88' },
  { Source: '16', EV_type: 'Exosome', Cancer_Source_type: 'Kidney', Specific_miRNA_counts: '97' },
  { Source: '17', EV_type: 'Exosome', Cancer_Source_type: 'Lung', Specific_miRNA_counts: '96' },
  { Source: '18', EV_type: 'Exosome', Cancer_Source_type: 'Lymph', Specific_miRNA_counts: '64' },
  { Source: '19', EV_type: 'Exosome', Cancer_Source_type: 'Mouth', Specific_miRNA_counts: '32' },
  { Source: '20', EV_type: 'Exosome', Cancer_Source_type: 'Nerve', Specific_miRNA_counts: '167' },
  { Source: '21', EV_type: 'Exosome', Cancer_Source_type: 'Ovary', Specific_miRNA_counts: '25' },
  { Source: '22', EV_type: 'Microvesicle', Cancer_Source_type: 'Pancreas', Specific_miRNA_counts: '62' },
  { Source: '23', EV_type: 'Exosome', Cancer_Source_type: 'Prostate', Specific_miRNA_counts: '77' },
  { Source: '24', EV_type: 'Microvesicle', Cancer_Source_type: 'Prostate', Specific_miRNA_counts: '52' },
  { Source: '25', EV_type: 'Exosome', Cancer_Source_type: 'Skin', Specific_miRNA_counts: '103' },
  { Source: '26', EV_type: 'Microvesicle', Cancer_Source_type: 'Skin', Specific_miRNA_counts: '103' },
  { Source: '27', EV_type: 'Exosome', Cancer_Source_type: 'Stomach', Specific_miRNA_counts: '37' },
  { Source: '28', EV_type: 'Exosome', Cancer_Source_type: 'Tongue', Specific_miRNA_counts: '236' },
  { Source: '29', EV_type: 'Exosome', Cancer_Source_type: 'Uterus', Specific_miRNA_counts: '54' },
  { Source: '30', EV_type: 'Exosome', Cancer_Source_type: 'Vessel', Specific_miRNA_counts: '61' },
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
