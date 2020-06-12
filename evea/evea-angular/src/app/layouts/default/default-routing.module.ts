import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from './default.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      // dashboard routing
      {
        path: '',
        loadChildren: () => import('src/app/modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      // samples routing
      {
        path: 'samples',
        loadChildren: () => import('src/app/modules/samples/samples.module').then((m) => m.SamplesModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefaultRoutingModule {}
