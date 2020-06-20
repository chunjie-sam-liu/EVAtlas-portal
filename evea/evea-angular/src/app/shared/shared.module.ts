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

@NgModule({
  declarations: [HeaderComponent, FooterComponent, SidebarComponent, MaterialElevationDirective],
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
  ],
})
export class SharedModule {}
