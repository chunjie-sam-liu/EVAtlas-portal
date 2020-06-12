import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformModule } from '@angular/cdk/platform';
import { ObserversModule } from '@angular/cdk/observers';

import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';

// flex layout and animation
import { FlexLayoutModule } from '@angular/flex-layout';

// import material
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';

const MaterialComponents = [
  FlexLayoutModule,
  PlatformModule,
  ObserversModule,
  MatSidenavModule,
  MatButtonToggleModule,
  MatButtonModule,
  MatIconModule,
  MatDividerModule,
  MatProgressSpinnerModule,
  MatListModule,
  MatToolbarModule,
  MatMenuModule,
  MatCardModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, MaterialComponents, NgxEchartsModule.forRoot({ echarts })],
  exports: [MaterialComponents, NgxEchartsModule],
})
export class MaterialModule {}
