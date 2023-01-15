import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ModalConfig } from 'src/app/modals/modalConfig';
import { SharedModalComponent } from 'src/app/modals/shared-modal/shared-modal.component';
import { Departments } from 'src/app/models/department';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-departmentmodal',
  templateUrl: './departmentmodal.component.html',
  styleUrls: ['./departmentmodal.component.scss']
})
export class DepartmentmodalComponent {

  departmentRequest:Departments=
  {
    id:null,
    name:''
  }

  constructor(private departmentService:DepartmentService){}
  isCloseStatus: any;

  @ViewChild('addDepartment') private addDepartmentModal: SharedModalComponent
  @ViewChild('editDepartment') private editDepartmentModal: SharedModalComponent
  @ViewChild('deleteDepartment') private deleteDepartmentModal: SharedModalComponent
  @Output() newConfirmationEvent = new EventEmitter<boolean>();

  addModalConfig: ModalConfig = {
    modalTitle: 'Add Department',
    dismissButtonLabel: 'Cancel',
    closeButtonLabel: 'Add',
    buttonStyle: "btn btn-outline-primary"
  }

  editModalConfig: ModalConfig = {
    modalTitle: 'Edit',
    dismissButtonLabel: 'Cancel',
    closeButtonLabel: 'Edit',
    buttonStyle: "btn btn-outline-primary"
  }

  deleteModalConfig: ModalConfig = {
    modalTitle: 'Delete',
    dismissButtonLabel: 'Cancel',
    closeButtonLabel: 'Delete',
    buttonStyle: "btn btn-outline-danger"
  }


  
  async openAddDepartmentModal() {

    return await this.addDepartmentModal.open()
  }

  async closeAddDepartmentnModal() {

    this.departmentRequest.name = this.departmentRequest.name.trim();
    this.departmentService.addDepartment(this.departmentRequest).subscribe();
    this.addDepartmentModal.close()
  }

  async openEditDepartmentModal(departmentId:number) {
    this.departmentService.getDepartment(departmentId).subscribe(result=>{
      this.departmentRequest=result;
    })
    return await this.editDepartmentModal.open()
  }

  async closeEditDepartmentnModal() {
    this.departmentRequest.name = this.departmentRequest.name.trim();
    this.departmentService.editDepartment(this.departmentRequest).subscribe();
    return await this.editDepartmentModal.close()
  }

  async openDeleteDepartmentModal(positionId: number) {
    this.departmentRequest.id = positionId  
    return await this.deleteDepartmentModal.open()

  }

  async closeDeleteDepartmentnModal() {
   this.departmentService.deleteDepartment(this.departmentRequest.id).subscribe();
    return await this.deleteDepartmentModal.close()
  }


  getConfirmationValue(value: any,modaltype:any) {
    if (value == 'Save click') {
      if(modaltype=='addDepartment')
      {
        this.isCloseStatus=true;
        this.closeAddDepartmentnModal();
      }

      if(modaltype=='editDepartment')
      {
        this.isCloseStatus=true;
        this.closeEditDepartmentnModal();
      }

      if(modaltype=='deleteDepartment')
      {
        this.isCloseStatus=true;
        this.closeDeleteDepartmentnModal();
      }
      this.newConfirmationEvent.emit(this.isCloseStatus);
    }
  }
}
