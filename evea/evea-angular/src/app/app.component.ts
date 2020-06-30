import { Component, OnInit, OnDestroy } from '@angular/core';

// testservice api

import { BaseHttpService } from './shared/base-http.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Extracellular vesicle Expression Atlas';
}
