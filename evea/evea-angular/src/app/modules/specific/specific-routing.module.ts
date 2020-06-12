import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SpecificComponent } from './specific.component';

const routes: Routes = [
  {
    path: '',
    component: SpecificComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpecificRoutingModule {}
