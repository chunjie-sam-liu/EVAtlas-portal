import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { DefaultRoutingModule } from './default-routing.module';
import { DefaultComponent } from './default.component';

@NgModule({
  declarations: [DefaultComponent],
  imports: [CommonModule, DefaultRoutingModule, SharedModule],
})
export class DefaultModule {}
