import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { SamplesComponent } from 'src/app/modules/samples/samples.component';

@NgModule({
  declarations: [DefaultComponent, DashboardComponent, SamplesComponent],
  imports: [CommonModule, RouterModule],
})
export class DefaultModule {}
