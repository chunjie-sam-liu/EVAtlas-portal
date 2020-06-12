import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RnaComponent } from './rna.component';
import { RnaRoutingModule } from './rna-routing.module';

@NgModule({
  declarations: [RnaComponent],
  imports: [CommonModule, RnaRoutingModule],
})
export class RnaModule {}
