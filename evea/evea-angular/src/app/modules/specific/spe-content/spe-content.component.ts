import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SpeApiService } from '../spe-api.service';
import { Observable } from 'rxjs';
import { SpeTissue } from 'src/app/shared/model/spe-tissue';
import { Router } from '@angular/router';

@Component({
  selector: 'app-spe-content',
  templateUrl: './spe-content.component.html',
  styleUrls: ['./spe-content.component.css'],
})
export class SpeContentComponent implements OnInit, OnChanges {
  @Input() tissue: any;

  speTissue$: Observable<SpeTissue>;
  constructor(private speApiService: SpeApiService, private router: Router) {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    this.speTissue$ = this.speApiService.getSpeTissue('tissue', this.tissue.ex_type, this.tissue.tissue);
  }

  public sortGS(a: any, b: any) {
    return a.GeneSymbol > b.GeneSymbol ? -1 : 1;
  }

  public goToDetail(s: string) {
    this.router.navigate([`rna/detail/${s}`]);
  }
}
