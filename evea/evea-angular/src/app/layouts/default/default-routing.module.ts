import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from './default.component';

import { ContactComponent } from 'src/app/modules/contact/contact.component';
import { DocumentComponent } from 'src/app/modules/document/document.component';

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
      { path: 'document', component: DocumentComponent },
      { path: 'contact', component: ContactComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefaultRoutingModule {}
