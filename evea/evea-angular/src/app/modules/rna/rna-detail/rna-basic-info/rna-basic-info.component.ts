import { Component, OnInit, Input } from '@angular/core';
import { RnaDetailApiService } from '../rna-detail-api.service';

@Component({
  selector: 'app-rna-basic-info',
  templateUrl: './rna-basic-info.component.html',
  styleUrls: ['./rna-basic-info.component.css'],
})
export class RnaBasicInfoComponent implements OnInit {
  @Input() rnaSymbol: string;

  constructor(private rnaDetailApiService: RnaDetailApiService) {}

  ngOnInit(): void {
    this.rnaDetailApiService.findRnaBasicInfo(this.rnaSymbol).subscribe((res) => {
      console.log(res);
    });
  }
}
