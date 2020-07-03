import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SamplesRoutingModule } from './samples-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { SamplesComponent } from './samples.component';
import { SampleCardComponent } from './sample-card/sample-card.component';
import { SamplesStatisticsComponent } from './samples-statistics/samples-statistics.component';
import { SampleContentComponent } from './sample-content/sample-content.component';
import { SampleTableComponent } from './sample-content/sample-table/sample-table.component';
import { SampleStatComponent } from './sample-content/sample-stat/sample-stat.component';
import { SampleRnaAvgComponent } from './sample-content/sample-rna-avg/sample-rna-avg.component';
import { RnaAvgTableComponent } from './sample-content/sample-rna-avg/rna-avg-table/rna-avg-table.component';
import { SampleIsolationComponent } from './sample-content/sample-isolation/sample-isolation.component';

@NgModule({
  declarations: [
    SamplesComponent,
    SampleCardComponent,
    SamplesStatisticsComponent,
    SampleContentComponent,
    SampleTableComponent,
    SampleStatComponent,
    SampleRnaAvgComponent,
    RnaAvgTableComponent,
    SampleIsolationComponent,
  ],
  imports: [CommonModule, SamplesRoutingModule, SharedModule],
})
export class SamplesModule {}
