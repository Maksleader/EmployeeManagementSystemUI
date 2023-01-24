import { Component, Input, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { SharedModalComponent } from "src/app/modals/shared-modal/shared-modal.component";
import { Departments } from "src/app/models/department";
import { DepartmentService } from "src/app/services/department.service";
import { ModalconfigService } from "src/app/services/modalconfig.service";
import { DepartmentComponent } from "../department.component";

@Component({
  selector: "app-departmentmodal",
  templateUrl: "./departmentmodal.component.html",
  styleUrls: ["./departmentmodal.component.scss"]
})
export class DepartmentmodalComponent {

  updateDepartmentRequest: Departments = new Departments()
  isEditNameInvalid: boolean
  addDepartmentRequest: Departments = new Departments();

  constructor(private departmentService: DepartmentService,
    public modalConfig: ModalconfigService,
    private toastr: ToastrService) { }

  @ViewChild("addDepartment") private addDepartmentModal: SharedModalComponent
  @ViewChild("editDepartment") private editDepartmentModal: SharedModalComponent
  @ViewChild("deleteDepartment") private deleteDepartmentModal: SharedModalComponent
  @Input() parent: DepartmentComponent;

  async openAddDepartmentModal() {

    return await this.addDepartmentModal.open()
  }

  async addDepartmentnModal(form: NgForm) {

    this.addDepartmentRequest = form.value as Departments;
    this.addDepartmentRequest.name = this.addDepartmentRequest.name.trim();
    this.departmentService.addDepartment(this.addDepartmentRequest).subscribe({
      next: (() => {
        this.parent.refreshDepartment();
        this.addDepartmentModal.close()
      }),
      error: (response => {
        this.toastr.error(response.error.message, "Add Department")
      })
    });

  }

  async closeAddDepartmentModal(form: NgForm) {
    form.reset()
    this.addDepartmentRequest = new Departments();
  }

  async openEditDepartmentModal(departmentId: number) {
    this.departmentService.getDepartment(departmentId).subscribe({
      next: (async result => {
        this.updateDepartmentRequest = result;
        return await this.editDepartmentModal.open()
      }),
      error: (response => {
        this.toastr.error(response.error.message, "Edit Department");
        this.isEditNameInvalid = true;
      })

    })

  }

  async editDepartmentnModal() {
    this.updateDepartmentRequest.name = this.updateDepartmentRequest.name.trim();
    this.departmentService.editDepartment(this.updateDepartmentRequest).subscribe({
      next: (() => {
        this.parent.refreshDepartment();
        return this.editDepartmentModal.close()
      }),
      error: (response => {
        this.toastr.error(response.error.message, "Edit Department")
      })
    });

  }

  async closeEditDepartmentModal(form: NgForm) {
    form.reset()
    this.updateDepartmentRequest = new Departments();
    this.isEditNameInvalid = false;
  }

  async openDeleteDepartmentModal(positionId: number) {
    this.updateDepartmentRequest.id = positionId
    return await this.deleteDepartmentModal.open()

  }

  async deleteDepartmentnModal() {
    this.departmentService.deleteDepartment(this.updateDepartmentRequest.id).subscribe({
      next: (() => {
        this.parent.refreshDepartment();
        return this.deleteDepartmentModal.close()
      }),
      error: (response => {
        this.toastr.error(response.error.message, "Delete Department")
      })
    });

  }

  stateChange(value: string) {
    if (value.length == 0) {
      this.isEditNameInvalid = true;
    }
    else if (value.length > 0) {
      this.isEditNameInvalid = false;
    }

  }
}
