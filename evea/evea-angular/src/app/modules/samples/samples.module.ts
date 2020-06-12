import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/shared/material.module';

import { SamplesComponent } from './samples.component';
import { SamplesRoutingModule } from './samples-routing.module';

@NgModule({
  declarations: [SamplesComponent],
  imports: [MaterialModule, SamplesRoutingModule],
})
export class SamplesModule {}
