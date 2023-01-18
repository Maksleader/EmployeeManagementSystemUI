import { Component, Input, ViewChild } from '@angular/core';
import { SharedModalComponent } from 'src/app/modals/shared-modal/shared-modal.component';
import { Departments } from 'src/app/models/department';
import { DepartmentService } from 'src/app/services/department.service';
import { ModalconfigService } from 'src/app/services/modalconfig.service';
import { DepartmentComponent } from '../department.component';

@Component({
  selector: 'app-departmentmodal',
  templateUrl: './departmentmodal.component.html',
  styleUrls: ['./departmentmodal.component.scss']
})
export class DepartmentmodalComponent {

  departmentRequest:Departments=new Departments()

  addDepartmentRequest:Departments=new Departments();

  constructor(private departmentService:DepartmentService,public modalConfig:ModalconfigService){}
  isCloseStatus: any;

  @ViewChild('addDepartment') private addDepartmentModal: SharedModalComponent
  @ViewChild('editDepartment') private editDepartmentModal: SharedModalComponent
  @ViewChild('deleteDepartment') private deleteDepartmentModal: SharedModalComponent
  @Input() parent:DepartmentComponent;

  async openAddDepartmentModal() {

    return await this.addDepartmentModal.open()
  }

  async addDepartmentnModal() {

    this.addDepartmentRequest.name = this.addDepartmentRequest.name.trim();
    this.departmentService.addDepartment(this.addDepartmentRequest).subscribe(_=>{
      this.parent.refreshDepartment();
    });
    this.addDepartmentRequest.name=null;
    this.addDepartmentModal.close()
  }

  async openEditDepartmentModal(departmentId:number) {
    this.departmentService.getDepartment(departmentId).subscribe(result=>{
      this.departmentRequest=result;
    })
    return await this.editDepartmentModal.open()
  }

  async editDepartmentnModal() {
    this.departmentRequest.name = this.departmentRequest.name.trim();
    this.departmentService.editDepartment(this.departmentRequest).subscribe(_=>{
      this.parent.refreshDepartment();
    });
    return this.editDepartmentModal.close()
  }

  async openDeleteDepartmentModal(positionId: number) {
    this.departmentRequest.id = positionId  
    return await this.deleteDepartmentModal.open()

  }

  async deleteDepartmentnModal() {
   this.departmentService.deleteDepartment(this.departmentRequest.id).subscribe(_=>{
    this.parent.refreshDepartment();
  });
    return this.deleteDepartmentModal.close()
  }
}
