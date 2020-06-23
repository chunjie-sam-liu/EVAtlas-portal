import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rna-detail',
  templateUrl: './rna-detail.component.html',
  styleUrls: ['./rna-detail.component.css'],
})
export class RnaDetailComponent implements OnInit {
  rnaSymbol: string;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.rnaSymbol = params.rna;
    });
  }

  ngOnInit(): void {}
}
