import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// flex layout and animation
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, FlexLayoutModule, MaterialModule],
  exports: [FlexLayoutModule, MaterialModule],
})
export class SharedModule {}
