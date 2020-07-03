import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { DocumentComponent } from './document.component';
import { DocumentRoutingModule } from './document-routing.module';

@NgModule({
  declarations: [DocumentComponent],
  imports: [CommonModule, DocumentRoutingModule, SharedModule],
})
export class DocumentModule {}
