import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { SharedModalComponent } from "src/app/modals/shared-modal/shared-modal.component";
import { AddEmployee } from "src/app/models/addEmployee";
import { EmployeeInfo } from "src/app/models/EmployeeInfo";
import { DepartmentService } from "src/app/services/department.service";
import { EmployeeService } from "src/app/services/employee.service";
import { PositionService } from "src/app/services/position.service";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { Departments } from "src/app/models/department";
import { EmployeeMangers } from "src/app/models/employeeManagers";
import { ManagerEmployees } from "src/app/models/managerEmployees";
import { UpdateEmployee } from "src/app/models/updateEmployee";
import { Position } from "src/app/models/position";
import { EmployeeComponent } from "../employee.component";
import { ModalconfigService } from "src/app/services/modalconfig.service";
import { ToastrService } from "ngx-toastr";
import { NgForm } from "@angular/forms";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-employeemodal",
  templateUrl: "./employeemodal.component.html",
  styleUrls: ["./employeemodal.component.scss"],
})
export class EmployeemodalComponent implements OnInit {
  allpositions: Position[] = []
  employees: EmployeeInfo[] = [];
  alldepartments: Departments[] = [];
  addEmployeeRequest: AddEmployee = new AddEmployee();
  isManagerInvalid: boolean;
  dropdownSettings: IDropdownSettings;
  employeeManagers: EmployeeMangers[] = [];
  managerEmployees: ManagerEmployees[] = [];
  updateEmployee: UpdateEmployee = new UpdateEmployee();
  employeeId: number;
  isEditNameandSurnameInvalid: boolean

  @ViewChild("addemployee") private addemployeeModal: SharedModalComponent
  @ViewChild("editemployee") private editemployeeModal: SharedModalComponent
  @ViewChild("getemployeeMangers") private employeeManagersModal: SharedModalComponent
  @ViewChild("getMangerEmployee") private managerEmployeeModal: SharedModalComponent
  @ViewChild("deleteemployee") private deleteEmployeeModal: SharedModalComponent
  @ViewChild("myDate") executionActDate: ElementRef;
  @Input() parent: EmployeeComponent
  @Input() employeeName: string;
  modalTitle: string = "";

  constructor(
    private employeeServices: EmployeeService,
    private postionService: PositionService,
    private departmentService: DepartmentService,
    public modalConfig: ModalconfigService,
    private toastr: ToastrService) {

  }

  ngOnInit(): void {

    this.dropdownSettings = {
      singleSelection: false,
      idField: "id",
      textField: "name",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 3,
      allowSearchFilter: false,
    };
  }

  async openAddEmployeeModal() {

    this.postionService.getAllPositions().subscribe(result => {
      this.allpositions = result;
    })

    this.departmentService.getAllDepartments().subscribe(result => {
      this.alldepartments = result;
    });

    this.employeeServices.getAllEmployees().subscribe(data => {
      this.employees = data;
    });
    return await this.addemployeeModal.open();

  }

  async addEmployee(form: NgForm) {
    this.addEmployeeRequest = form.value as AddEmployee;
    this.addEmployeeRequest.name = this.addEmployeeRequest.name.trim();
    this.addEmployeeRequest.surname = this.addEmployeeRequest.surname.trim();
    this.employeeServices.addEmployee(this.addEmployeeRequest).subscribe({
      next: (() => {
        this.parent.refreshEmployee();
        return this.addemployeeModal.close()
      }),
      error: (response => {
        this.toastr.error(response.error.message, "Add Employee");
      })
    })
    this.addEmployeeRequest = new AddEmployee();

  }

  async closeAddEmployeeModal(form: NgForm) {
    form.reset()
    this.addEmployeeRequest = new AddEmployee();
  }

  async openDeleteModal(employeeId: number) {
    this.employeeId = employeeId
    return await this.deleteEmployeeModal.open()
  }

  async deleteEmployee() {
    (await this.employeeServices.deleteEmployee(this.employeeId)).subscribe({
      next: (() => {
        this.parent.refreshEmployee();
        return this.deleteEmployeeModal.close()
      }),
      error: (response => {
        this.toastr.error(response.error.message, "Delete Employee");
      })
    })

  }

  async openEditModal(employeeId: number) {

    (await this.employeeServices.getManagerEmployees(employeeId)).subscribe({
      next: (result => {
        this.managerEmployees = result;
      }),
    });

    (await this.employeeServices.getEmployee(employeeId)).subscribe({
      next: (async result => {

        this.updateEmployee = result;
        const datepipe: DatePipe = new DatePipe("en-US")
        this.updateEmployee.birthDate = datepipe.transform(this.updateEmployee.birthDate, "yyyy-MM-dd")
        return await this.editemployeeModal.open()
      }),
      error: (() => {
        this.toastr.error("Can not get current employee info. You do not have permission", "Edit Employee");
        this.isEditNameandSurnameInvalid = true;
      })

    });
    this.postionService.getAllPositions().subscribe(result => {
      this.allpositions = result;
    });

    this.departmentService.getAllDepartments().subscribe(result => {
      this.alldepartments = result;
    });

    this.employeeServices.getAllEmployees().subscribe(data => {
      this.employees = data.filter(employee => employee.id != employeeId)
    });

  }

  async editEmployee() {
    this.employeeServices.editEmployee(this.updateEmployee.id, this.updateEmployee).subscribe({
      next: (() => {
        this.parent.refreshEmployee();
        return this.editemployeeModal.close()
      }),
      error: (response => {
        this.toastr.error(response.error.message);
      })
    })

  }

  async closeEditEmployeeModal(form: NgForm) {
    this.updateEmployee = new UpdateEmployee();
    form.reset();
    this.isManagerInvalid = false;
    this.isEditNameandSurnameInvalid = false;
  }


  async openGetEmployeeManagersModal(employeeId: number, employeeName: string) {
    this.modalTitle = employeeName;
    (await this.employeeServices.getEmployeeManager(employeeId)).subscribe({
      next: (async result => {
        this.employeeManagers = result;
        return await this.employeeManagersModal.open()
      }),
      error: (response => {
        this.toastr.error(response.error.message, "Managers");
      })
    })
    this.employeeManagers = [];

  }

  async closeGetEmployeeManagersModal() {
    this.employeeManagers = [];
  }

  async openGetManagerEmployeesModal(employeeId: number, employeeName: string) {
    this.modalTitle = employeeName;
    (await this.employeeServices.getManagerEmployees(employeeId)).subscribe({
      next: (async result => {
        this.managerEmployees = result;
        return await this.managerEmployeeModal.open()
      }),
      error: (response => {
        this.toastr.error(response.error.message, "Employees");
      })
    })

  }

  async closeGetManagerEmployeesModal() {
    this.managerEmployees = [];
  }

  async Onselect(mangerId: number): Promise<boolean> {

    this.isManagerInvalid = this.managerEmployees.findIndex(emp => emp.id == mangerId) != -1;
    return false;
  }

  stateChange(value: string) {
    if (value.length == 0) {
      this.isEditNameandSurnameInvalid = true;
    }
    else if (value.length > 0) {
      this.isEditNameandSurnameInvalid = false;
    }

  }

}
