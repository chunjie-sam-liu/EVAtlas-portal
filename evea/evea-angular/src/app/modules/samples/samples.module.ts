import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/shared/material.module';

import { SamplesRoutingModule } from './samples-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { SamplesComponent } from './samples.component';

@NgModule({
  declarations: [SamplesComponent],
  imports: [MaterialModule, SamplesRoutingModule, SharedModule],
})
export class SamplesModule {}
