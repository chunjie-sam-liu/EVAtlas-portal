import { Component, OnInit, Input } from '@angular/core';
import { RnaDetailApiService } from '../rna-detail-api.service';

@Component({
  selector: 'app-mirna-function',
  templateUrl: './mirna-function.component.html',
  styleUrls: ['./mirna-function.component.css'],
})
export class MirnaFunctionComponent implements OnInit {
  @Input() rnaSymbol: string;
  @Input() rnaType: string;

  constructor(private rnaDetailApi: RnaDetailApiService) {}

  ngOnInit(): void {
    this.rnaDetailApi.getmiRNADrugs(this.rnaSymbol).subscribe((res) => {
      console.log(res);
    });

    this.rnaDetailApi.getmiRNATarget(this.rnaSymbol).subscribe((res) => {
      console.log(res);
    });
  }
}
