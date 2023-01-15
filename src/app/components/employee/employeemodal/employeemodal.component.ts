import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ɵisStandalone } from '@angular/core';
import { SharedModalComponent } from 'src/app/modals/shared-modal/shared-modal.component';
import { AddEmployee } from 'src/app/models/addEmployee';
import { EmployeeInfo } from 'src/app/models/EmployeeInfo';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { PositionService } from 'src/app/services/position.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Departments } from 'src/app/models/department';
import { EmployeeMangers } from 'src/app/models/employeeManagers';
import { ActivatedRoute } from '@angular/router';
import { ManagerEmployees } from 'src/app/models/managerEmployees';
import { UpdateEmployee } from 'src/app/models/updateEmployee';
import { Position } from 'src/app/models/position';
import { ModalConfig } from 'src/app/modals/modalConfig';
@Component({
  selector: 'app-employeemodal',
  templateUrl: './employeemodal.component.html',
  styleUrls: ['./employeemodal.component.scss'],
})
export class EmployeemodalComponent implements OnInit {
  allpositions: Position[] = []
  employees: EmployeeInfo[] = [];
  alldepartments: Departments[] = [];
  addEmployeeRequest: AddEmployee = {
    name: '',
    surname: '',
    birthDate: null,
    positionId: null,
    managerId: null,
    employeeDepartments: []
  };
  dropdownSettings: IDropdownSettings;
  positionDropdownSettings: IDropdownSettings;
  employeeManagers: EmployeeMangers[] = [];
  managerEmployees: ManagerEmployees[] = [];
  updateEmployee: UpdateEmployee = {
    id: null,
    name: '',
    surname: '',
    birthDate: null,
    positionId: null,
    managerId: null,
    departments: [] = []
  }
  employeeId: number
  isCloseStatus: any;

  @ViewChild('addemployee') private addemployeeModal: SharedModalComponent
  @ViewChild('edit') private editemployeeModal: SharedModalComponent
  @ViewChild('getemployeeMangers') private employeeManagersModal: SharedModalComponent
  @ViewChild('getMangerEmployee') private managerEmployeeModal: SharedModalComponent
  @ViewChild('deleteEmployee') private deleteEmployeeModal: SharedModalComponent
  @Output() newConfirmationEvent = new EventEmitter<boolean>();

  addModalConfig: ModalConfig = {
    modalTitle: 'Add Employee',
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

  getMangersModalConfig: ModalConfig = {
    modalTitle: 'Managers',
    dismissButtonLabel: 'Cancel',
    closeButtonLabel: 'Ok',
    buttonStyle: "btn btn-outline-primary"
  }

  getManagersEmployeeModalConfig: ModalConfig = {
    modalTitle: 'Employee',
    dismissButtonLabel: 'Cancel',
    closeButtonLabel: 'Ok',
    buttonStyle: "btn btn-outline-primary"
  }

  deleteModalConfig: ModalConfig = {
    modalTitle: 'Delete',
    dismissButtonLabel: 'Cancel',
    closeButtonLabel: 'Delete',
    buttonStyle: "btn btn-outline-danger"
  }

  constructor(
    private employeeServices: EmployeeService,
    private postionService: PositionService,
    private departmentService: DepartmentService,) {

  }

  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: false
    };


  }

  async openAddEmployeeModal() {

    this.postionService.getAllPostions().subscribe(result => {
      this.allpositions = result;
    })

    this.departmentService.getAllDepartments().subscribe(result => {
      this.alldepartments = result;
    });

    await this.employeeServices.getAllEmployees().then(data => {
      this.employees = data;
    });
    this.isCloseStatus = false;
    return await this.addemployeeModal.open()
  }

  async closeAddEmployeeMOdal() {

    this.addEmployeeRequest.name = this.addEmployeeRequest.name.trim();
    this.addEmployeeRequest.surname = this.addEmployeeRequest.surname.trim();
    (await this.employeeServices.addEmployee(this.addEmployeeRequest)).subscribe();

    this.addemployeeModal.close()
  }

  async openDeleteModal(employeeId: number) {
    this.employeeId = employeeId
    return await this.deleteEmployeeModal.open()

  }

  async closeDeleteModal() {
    (await this.employeeServices.deleteEmployee(this.employeeId)).subscribe();
    return await this.deleteEmployeeModal.close()
  }

  async openEditModal(employeeId: number) {
    (await this.employeeServices.getEmployee(employeeId)).subscribe(result => {
      this.updateEmployee = result;
    })

    this.postionService.getAllPostions().subscribe(result => {
      console.log(this.allpositions);
      this.allpositions = result;

    })


    this.departmentService.getAllDepartments().subscribe(result => {
      console.log(result);
      this.alldepartments = result;
    });

    await this.employeeServices.getAllEmployees().then(data => {
      this.employees = data;
    });

    return await this.editemployeeModal.open()
  }

  async closeEditModal() {
    (await this.employeeServices.editEmployee(this.updateEmployee.id, this.updateEmployee)).subscribe();
    return await this.editemployeeModal.close()
  }

  async openGetEmployeeManagersModal(employeeId: number) {
    (await this.employeeServices.getEmployeeManager(employeeId)).subscribe(result => {
      this.employeeManagers = result;
    })
    return await this.employeeManagersModal.open()
  }

  async openGetManagerEmployees(employeeId: number) {
    (await this.employeeServices.getManagerEmployees(employeeId)).subscribe(result => {
      this.managerEmployees = result;
    })
    return await this.managerEmployeeModal.open()
  }
  async getConfirmationValue(value: any, modaltype: any) {

    if (value == 'Save click') {
      if (modaltype == 'addemployee') {
        await this.closeAddEmployeeMOdal();
        this.isCloseStatus = true;
      }
      if (modaltype == 'edit') {
        await this.closeEditModal();
        this.isCloseStatus = true;
      }

      if (modaltype == 'delete') {
        await this.closeDeleteModal();
        this.isCloseStatus = true;
      }

      this.newConfirmationEvent.emit(this.isCloseStatus);
    }


  }
}
