import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecificRoutingModule } from './specific-routing.module';
import { SpecificComponent } from './specific.component';


@NgModule({
  declarations: [SpecificComponent],
  imports: [CommonModule, SpecificRoutingModule],
})
export class SpecificModule {}
