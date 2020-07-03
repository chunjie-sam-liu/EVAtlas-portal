import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SamplesComponent } from './samples.component';

const routes: Routes = [{ path: '', component: SamplesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SamplesRoutingModule {}
