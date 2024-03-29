import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MaterialElevationDirective } from './directives/material-elevation.directive';
import { EchartsModule } from './echarts.module';
import { RedSeedPipe } from './pipes/red-seed.pipe';
import { RmclPipe } from './pipes/rmcl.pipe';
import { ReplacePipe } from './pipes/replace.pipe';
import { EvRenamePipe } from './pipes/ev-rename.pipe';
import { EvRenameSpePipe } from './pipes/ev-rename-spe.pipe';
import { CellsRenamePipe } from './pipes/cells-rename.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MaterialElevationDirective,
    RedSeedPipe,
    RmclPipe,
    ReplacePipe,
    EvRenamePipe,
    EvRenameSpePipe,
    CellsRenamePipe,
  ],
  imports: [CommonModule, MaterialModule, EchartsModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [
    MaterialModule,
    EchartsModule,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MaterialElevationDirective,
    FormsModule,
    ReactiveFormsModule,
    RedSeedPipe,
    RmclPipe,
    ReplacePipe,
    EvRenamePipe,
    EvRenameSpePipe,
    CellsRenamePipe,
  ],
})
export class SharedModule {}
