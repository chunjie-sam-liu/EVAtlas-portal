import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material.module';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, SidebarComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [MaterialModule, HeaderComponent, FooterComponent, SidebarComponent],
})
export class SharedModule {}
