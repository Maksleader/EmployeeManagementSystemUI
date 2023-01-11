import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModalComponent } from './shared-modal/shared-modal.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SharedModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([])
  ],
  exports: [SharedModalComponent]
  
})
export class ModalsModule { }
