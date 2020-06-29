import { Component, OnInit, Input } from '@angular/core';
import { EChartOption } from 'echarts';
import { RnaDetailApiService } from '../rna-detail-api.service';
import { RnaExpr } from 'src/app/shared/model/rna-expr';

@Component({
  selector: 'app-rna-expr',
  templateUrl: './rna-expr.component.html',
  styleUrls: ['./rna-expr.component.css'],
})
export class RnaExprComponent implements OnInit {
  @Input() rnaSymbol: string;
  @Input() rnaType: string;

  exoDist: EChartOption;
  exoDistTitle: string;
  mvDist: EChartOption;
  mvDistTitle: string;

  constructor(private rnaDetialApiService: RnaDetailApiService) {}

  ngOnInit(): void {
    this.exoDistTitle = `${this.rnaSymbol} from exosomes expression in tissues`;
    this.mvDistTitle = `${this.rnaSymbol} from microvesicles expression in tissues`;

    this.rnaDetialApiService.findRnaExpr(this.rnaSymbol, this.rnaType, 1, 'Exosomes').subscribe((res) => {
      this.exoDist = this._plotDist(res, this.exoDistTitle);
    });

    // this.rnaDetialApiService.findRnaExpr(this.rnaSymbol, this.rnaType, 1, 'Microvesicles').subscribe((res) => {
    //   this.mvDist = this._plotDist(res, this.mvDistTitle);
    // });
  }

  private _plotDist(d: RnaExpr, title: string): EChartOption {
    console.log(d);
    return {};
  }
}
