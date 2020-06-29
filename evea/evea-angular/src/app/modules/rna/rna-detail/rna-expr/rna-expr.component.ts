import { Component, OnInit, Input } from '@angular/core';
import { EChartOption } from 'echarts';
import { RnaDetailApiService } from '../rna-detail-api.service';
import { RnaBasicInfo } from 'src/app/shared/model/rna-basic-info';

@Component({
  selector: 'app-rna-expr',
  templateUrl: './rna-expr.component.html',
  styleUrls: ['./rna-expr.component.css'],
})
export class RnaExprComponent implements OnInit {
  @Input() rnaInfo: RnaBasicInfo;

  exoDist: EChartOption;
  mvDist: EChartOption;
  constructor(private rnaDetialApiService: RnaDetailApiService) {}

  ngOnInit(): void {
    this.rnaDetialApiService.findRnaExpr('hsa-miR-21-5p', 'miRNA', 1, 'Exosomes').subscribe((res) => {
      console.log(res);
    });
  }
}
