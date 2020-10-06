import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RnaRoutingModule } from './rna-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { RnaComponent } from './rna.component';
import { RnaTableComponent } from './rna-table/rna-table.component';
import { RnaDetailComponent } from './rna-detail/rna-detail.component';
import { RnaBasicInfoComponent } from './rna-detail/rna-basic-info/rna-basic-info.component';
import { RnaExprComponent } from './rna-detail/rna-expr/rna-expr.component';
import { MirnaFunctionComponent } from './rna-detail/mirna-function/mirna-function.component';
import { RnaRefComponent } from './rna-detail/rna-ref/rna-ref.component';
import { RnaMiscComponent } from './rna-detail/rna-misc/rna-misc.component';

@NgModule({
  declarations: [RnaComponent, RnaTableComponent, RnaDetailComponent, RnaBasicInfoComponent, RnaExprComponent, MirnaFunctionComponent, RnaRefComponent, RnaMiscComponent],
  imports: [CommonModule, RnaRoutingModule, SharedModule],
})
export class RnaModule { }
