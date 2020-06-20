import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { FeatureDiscriptionComponent } from './feature-discription/feature-discription.component';
import { StatOverviewComponent } from './stat-overview/stat-overview.component';

@NgModule({
  declarations: [DashboardComponent, SearchBoxComponent, FeatureDiscriptionComponent, StatOverviewComponent],
  imports: [CommonModule, DashboardRoutingModule, SharedModule],
  exports: [],
})
export class DashboardModule {}
