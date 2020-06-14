import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RnaRoutingModule } from './rna-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { RnaComponent } from './rna.component';

@NgModule({
  declarations: [RnaComponent],
  imports: [CommonModule, RnaRoutingModule, SharedModule],
})
export class RnaModule {}
