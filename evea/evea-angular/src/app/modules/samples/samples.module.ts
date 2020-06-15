import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SamplesRoutingModule } from './samples-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { SamplesComponent } from './samples.component';
import { SampleCardComponent } from './sample-card/sample-card.component';

@NgModule({
  declarations: [SamplesComponent, SampleCardComponent],
  imports: [CommonModule, SamplesRoutingModule, SharedModule],
})
export class SamplesModule {}
