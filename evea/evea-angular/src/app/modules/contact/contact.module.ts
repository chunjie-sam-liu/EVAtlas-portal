import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialElevationDirective } from 'src/app/shared/directives/material-elevation.directive';

import { SharedModule } from 'src/app/shared/shared.module';
import { ContactRoutingModule } from './contact-routing.module';

import { ContactComponent } from './contact.component';
import { ContactCardComponent } from './contact-card/contact-card.component';

@NgModule({
  declarations: [ContactComponent, ContactCardComponent, MaterialElevationDirective],
  imports: [CommonModule, ContactRoutingModule, SharedModule],
})
export class ContactModule {}
