import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MaterialElevationDirective } from './directives/material-elevation.directive';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, SidebarComponent, MaterialElevationDirective],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [MaterialModule, HeaderComponent, FooterComponent, SidebarComponent, MaterialElevationDirective],
})
export class SharedModule {}
