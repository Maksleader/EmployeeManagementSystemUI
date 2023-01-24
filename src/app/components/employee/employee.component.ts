import { Component, OnInit, ViewChild } from "@angular/core";
import { EmployeeInfo } from "src/app/models/EmployeeInfo";
import { AuthenticationService } from "src/app/services/authentication.services";
import { EmployeeService } from "src/app/services/employee.service";
import { ModalconfigService } from "src/app/services/modalconfig.service";
import { EmployeemodalComponent } from "./employeemodal/employeemodal.component";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.scss"],
})
export class EmployeeComponent implements OnInit {
  employees: EmployeeInfo[] = [];

  @ViewChild(EmployeemodalComponent) modal: EmployeemodalComponent

  constructor(private employeeServices: EmployeeService,
    public authService: AuthenticationService,
    private modalConfig: ModalconfigService,) { }

  ngOnInit() {
    this.refreshEmployee();
  }

  refreshEmployee() {
    this.employeeServices.getAllEmployees().subscribe({
      next: (result => {
        this.employees = result;
      })
    })
  }

  showAddemployeeModal() {
    this.modal.openAddEmployeeModal();
  }

  showeditModal(employeeId: number) {
    this.modal.openEditModal(employeeId);
  }

  showEmployeeManagersModal(employeeId: number, employeeName: string) {
    this.modalConfig.setModaltitle = employeeName;
    this.modal.openGetEmployeeManagersModal(employeeId, employeeName);
  }

  showManagerEmployeeModal(employeeId: number, employeeName: string) {

    this.modal.openGetManagerEmployeesModal(employeeId, employeeName);
  }

  showDeleteModal(employeeId: number) {
    this.modal.openDeleteModal(employeeId);
  }

}
