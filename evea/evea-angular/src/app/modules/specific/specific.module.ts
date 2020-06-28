import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecificRoutingModule } from './specific-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { SpecificComponent } from './specific.component';
import { SpeCardComponent } from './spe-card/spe-card.component';

@NgModule({
  declarations: [SpecificComponent, SpeCardComponent],
  imports: [CommonModule, SpecificRoutingModule, SharedModule],
})
export class SpecificModule {}
