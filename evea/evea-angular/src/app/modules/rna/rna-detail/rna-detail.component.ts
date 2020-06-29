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
  isMiRNA: boolean;
  rnaBasicInfo: RnaBasicInfo;

  constructor(private route: ActivatedRoute, private rnaDetailApiService: RnaDetailApiService) {
    this.route.params.subscribe((params) => {
      this.rnaSymbol = params.rna;
    });
    this.rnaDetailApiService.findRnaBasicInfo(this.rnaSymbol).subscribe((res) => {
      this.rnaBasicInfo = res;
      this.rnaType = res.class;
      this.isMiRNA = this.rnaType === 'miRNA' ? true : false;
    });
  }

  ngOnInit(): void {}
}
