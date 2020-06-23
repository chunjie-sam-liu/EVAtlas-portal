import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RnaDetailApiService } from './rna-detail-api.service';

@Component({
  selector: 'app-rna-detail',
  templateUrl: './rna-detail.component.html',
  styleUrls: ['./rna-detail.component.css'],
})
export class RnaDetailComponent implements OnInit {
  rnaSymbol: string;
  rnaBasicInfo: any;

  constructor(private route: ActivatedRoute, private rnaDetailApiService: RnaDetailApiService) {
    this.route.params.subscribe((params) => {
      this.rnaSymbol = params.rna;
    });
  }

  ngOnInit(): void {
    this.rnaDetailApiService.findRnaBasicInfo(this.rnaSymbol).subscribe((res) => {
      this.rnaBasicInfo = res;
    });
  }
}
