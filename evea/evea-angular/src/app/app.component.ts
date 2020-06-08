import { Component, OnInit, OnDestroy } from '@angular/core';

// testservice api

import { BaseHttpService } from './shared/services/base-http.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Extracellular Vescile Expression Atlas';
  public testData: any[];
  public sub: Subscription;
  constructor(private baseHttpService: BaseHttpService) {}

  public getData() {
    this.sub = this.baseHttpService.getData('home/test').subscribe((d) => {
      this.testData = d;
      console.log(d);
    });
  }

  ngOnInit(): void {
    this.getData();
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
