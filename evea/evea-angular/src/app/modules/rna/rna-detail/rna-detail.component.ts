import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RnaBasicInfo } from 'src/app/shared/model/rna-basic-info';
import { RnaDetailApiService } from './rna-detail-api.service';

@Component({
  selector: 'app-rna-detail',
  templateUrl: './rna-detail.component.html',
  styleUrls: ['./rna-detail.component.css'],
})
export class RnaDetailComponent implements OnInit {
  rnaSymbol: string;
  rnaType: string;
  isRNA: boolean;
  isMiRNA: boolean;
  rnaBasicInfo: RnaBasicInfo;

  constructor(private route: ActivatedRoute, private rnaDetailApiService: RnaDetailApiService) {
    this.route.params.subscribe((params) => {
      this.rnaSymbol = params.rna;
    });

    const annoParam = this.rnaSymbol.replace(/\#/, '%23');
    this.rnaDetailApiService.findRnaBasicInfo(annoParam).subscribe((res) => {
      this.rnaBasicInfo = res;
      console.log(this.rnaBasicInfo);
      this.rnaType = res.class;
      if (this.rnaType === 'miRNA' || this.rnaType === 'snoRNA' || this.rnaType === 'tRNA') {
        this.isRNA = true;
      } else {
        this.isRNA = false;
      }
      this.isMiRNA = this.rnaType === 'miRNA' ? true : false;
    });
  }

  ngOnInit(): void {}
}
