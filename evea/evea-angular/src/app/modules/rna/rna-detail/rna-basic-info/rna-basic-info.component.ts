import { Component, OnInit, Input } from '@angular/core';
import { RnaDetailApiService } from '../rna-detail-api.service';
import { RnaBasicInfo } from 'src/app/shared/model/rna-basic-info';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rna-basic-info',
  templateUrl: './rna-basic-info.component.html',
  styleUrls: ['./rna-basic-info.component.css'],
})
export class RnaBasicInfoComponent implements OnInit {
  @Input() rnaSymbol: string;

  rnaBasicInfo$: Observable<RnaBasicInfo>;

  constructor(private rnaDetailApiService: RnaDetailApiService) {}

  ngOnInit(): void {
    this.rnaBasicInfo$ = this.rnaDetailApiService.findRnaBasicInfo(this.rnaSymbol);
  }
}
