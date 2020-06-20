import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RnaComponent } from './rna.component';
import { RnaDetailComponent } from './rna-detail/rna-detail.component';

const routes: Routes = [
  {
    path: '',
    component: RnaComponent,
  },
  {
    path: 'detail/:rna',
    component: RnaDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RnaRoutingModule {}
