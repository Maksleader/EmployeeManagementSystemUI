import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModalComponent } from "./shared-modal/shared-modal.component";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";



@NgModule({
  declarations: [
    SharedModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [SharedModalComponent]
  
})
export class ModalsModule { }
