import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecificRoutingModule } from './specific-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { SpecificComponent } from './specific.component';
import { SpeContentComponent } from './spe-content/spe-content.component';

@NgModule({
  declarations: [SpecificComponent, SpeContentComponent],
  imports: [CommonModule, SpecificRoutingModule, SharedModule],
})
export class SpecificModule {}
