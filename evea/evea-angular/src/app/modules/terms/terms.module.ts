import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { TermsRoutingModule } from './terms-routing.module';

import { TermsComponent } from './terms.component';

@NgModule({
  declarations: [TermsComponent],
  imports: [CommonModule, TermsRoutingModule, SharedModule],
})
export class TermsModule {}
