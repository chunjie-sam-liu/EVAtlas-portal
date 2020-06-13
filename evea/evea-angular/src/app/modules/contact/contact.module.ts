import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/shared/material.module';

import { ContactComponent } from './contact.component';
import { ContactCardComponent } from './contact-card/contact-card.component';
import { ContactRoutingModule } from './contact-routing.module';
import { MaterialElevationDirective } from 'src/app/shared/directives/material-elevation.directive';

@NgModule({
  declarations: [ContactComponent, ContactCardComponent, MaterialElevationDirective],
  imports: [CommonModule, MaterialModule, ContactRoutingModule],
})
export class ContactModule {}
