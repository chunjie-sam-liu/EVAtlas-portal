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
      // rna
      {
        path: 'rna',
        loadChildren: () => import('src/app/modules/rna/rna.module').then((m) => m.RnaModule),
      },
      // specific expression
      {
        path: 'specific',
        loadChildren: () => import('src/app/modules/specific/specific.module').then((m) => m.SpecificModule),
      },
      {
        path: 'document',
        loadChildren: () => import('src/app/modules/document/document.module').then((m) => m.DocumentModule),
      },
      {
        path: 'contact',
        loadChildren: () => import('src/app/modules/contact/contact.module').then((m) => m.ContactModule),
      },
      {
        path: 'terms',
        loadChildren: () => import('src/app/modules/terms/terms.module').then((m) => m.TermsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefaultRoutingModule {}
