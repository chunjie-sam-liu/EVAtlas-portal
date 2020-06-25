import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SamplesRoutingModule } from './samples-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { SamplesComponent } from './samples.component';
import { SampleCardComponent } from './sample-card/sample-card.component';
import { SamplesStatisticsComponent } from './samples-statistics/samples-statistics.component';
import { SampleContentComponent } from './sample-content/sample-content.component';
import { SampleTableComponent } from './sample-content/sample-table/sample-table.component';

@NgModule({
  declarations: [SamplesComponent, SampleCardComponent, SamplesStatisticsComponent, SampleContentComponent, SampleTableComponent],
  imports: [CommonModule, SamplesRoutingModule, SharedModule],
})
export class SamplesModule {}
