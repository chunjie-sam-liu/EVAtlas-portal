import { Component, OnInit } from '@angular/core';
import { StatApiService } from './stat-api.service';

@Component({
  selector: 'app-samples-statistics',
  templateUrl: './samples-statistics.component.html',
  styleUrls: ['./samples-statistics.component.css'],
})
export class SamplesStatisticsComponent implements OnInit {
  constructor(private statApiService: StatApiService) {}

  ngOnInit(): void {
    this.statApiService.getDist('exosome').subscribe((val) => {
      console.log(val);
    });
  }
}
