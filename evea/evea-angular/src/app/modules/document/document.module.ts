import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/shared/material.module';

import { DocumentComponent } from './document.component';
import { DocumentRoutingModule } from './document-routing.module';

@NgModule({
  declarations: [DocumentComponent],
  imports: [CommonModule, MaterialModule, DocumentRoutingModule],
})
export class DocumentModule {}
