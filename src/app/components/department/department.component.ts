import { Component, OnInit, ViewChild } from '@angular/core';
import { Departments } from 'src/app/models/department';
import { AuthenticationService } from 'src/app/services/authentication.services';
import { DepartmentService } from 'src/app/services/department.service';
import { DepartmentmodalComponent } from './departmentmodal/departmentmodal.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  departments: Departments[];
  @ViewChild(DepartmentmodalComponent) modal: DepartmentmodalComponent

  constructor(private departmentService: DepartmentService,public authService:AuthenticationService) { }
  ngOnInit(): void {
  this.refreshDepartment();
  }

  refreshDepartment()
  {
    this.departmentService.getAllDepartments().subscribe({
      next: (result) => {
        this.departments = result;
      },
      error: (error) => {
        console.log(error);
      }
    })

  }

  showAddDepartmentModal() {
    this.modal.openAddDepartmentModal();
  }

  showEditDepartmentModal(departmentId: number) {
    this.modal.openEditDepartmentModal(departmentId);
  }

  showDeleteDepartmentModal(departmentId: number) {
    this.modal.openDeleteDepartmentModal(departmentId);
  }
  getConfirmationValue(value: boolean) {
    if (value == true) {
      this.refreshDepartment();
    }
  }
}
