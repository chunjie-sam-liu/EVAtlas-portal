import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RnaComponent } from './rna.component';

const routes: Routes = [
  {
    path: '',
    component: RnaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RnaRoutingModule {}
