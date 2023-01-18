import { Component, Input, OnInit, Type, ViewChild } from '@angular/core';
import { SharedModalComponent } from 'src/app/modals/shared-modal/shared-modal.component';
import { AddEmployee } from 'src/app/models/addEmployee';
import { EmployeeInfo } from 'src/app/models/EmployeeInfo';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { PositionService } from 'src/app/services/position.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Departments } from 'src/app/models/department';
import { EmployeeMangers } from 'src/app/models/employeeManagers';
import { ManagerEmployees } from 'src/app/models/managerEmployees';
import { UpdateEmployee } from 'src/app/models/updateEmployee';
import { Position } from 'src/app/models/position';
import { EmployeeComponent } from '../employee.component';
import { ModalconfigService } from 'src/app/services/modalconfig.service';
@Component({
  selector: 'app-employeemodal',
  templateUrl: './employeemodal.component.html',
  styleUrls: ['./employeemodal.component.scss'],
})
export class EmployeemodalComponent implements OnInit {
  allpositions: Position[] = []
  employees: EmployeeInfo[] = [];
  alldepartments: Departments[] = [];
  addEmployeeRequest: AddEmployee = new AddEmployee();
  isManagerValid:boolean

  dropdownSettings: IDropdownSettings;
  employeeManagers: EmployeeMangers[] = [];
  managerEmployees: ManagerEmployees[] = [];
  updateEmployee: UpdateEmployee = new UpdateEmployee();
  employeeId: number

  @ViewChild('addemployee') private addemployeeModal: SharedModalComponent
  @ViewChild('editemployee') private editemployeeModal: SharedModalComponent
  @ViewChild('getemployeeMangers') private employeeManagersModal: SharedModalComponent
  @ViewChild('getMangerEmployee') private managerEmployeeModal: SharedModalComponent
  @ViewChild('deleteemployee') private deleteEmployeeModal: SharedModalComponent
  @Input() parent: EmployeeComponent
  @Input() employeeName:string
  modalTitle:string='';

  constructor(
    private employeeServices: EmployeeService,
    private postionService: PositionService,
    private departmentService: DepartmentService,
    public modalConfig: ModalconfigService) {

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

    this.employeeServices.getAllEmployees().subscribe(data => {
      this.employees = data;
    });

    console.log(this.addEmployeeRequest.name);
    return await this.addemployeeModal.open()
  }

  async addEmployee() {

    this.addEmployeeRequest.name = this.addEmployeeRequest.name.trim();
    this.addEmployeeRequest.surname = this.addEmployeeRequest.surname.trim();
    this.employeeServices.addEmployee(this.addEmployeeRequest).subscribe(_ => {
      this.parent.refreshEmployee()
    });
    this.addemployeeModal.close()
  }

  async openDeleteModal(employeeId: number) {
    this.employeeId = employeeId
    return await this.deleteEmployeeModal.open()
  }

  async deleteEmployee() {
    (await this.employeeServices.deleteEmployee(this.employeeId)).subscribe(_ => {
      this.parent.refreshEmployee()
    });
    return this.deleteEmployeeModal.close()
  }

  async openEditModal(employeeId: number) {

    (await this.employeeServices.getManagerEmployees(employeeId)).subscribe(result => {
      this.managerEmployees = result;
    });

    (await this.employeeServices.getEmployee(employeeId)).subscribe(result => {
      this.updateEmployee = result;
    });

    this.postionService.getAllPostions().subscribe(result => {
      console.log(this.allpositions);
      this.allpositions = result;
    });

    this.departmentService.getAllDepartments().subscribe(result => {
      console.log(result);
      this.alldepartments = result;
    });

    this.employeeServices.getAllEmployees().subscribe(data => {
      this.employees = data.filter(employee => employee.id != employeeId)
    });
    return await this.editemployeeModal.open()
  }

  async editEmployee() {
    this.employeeServices.editEmployee(this.updateEmployee.id, this.updateEmployee).subscribe({
     next:(result)=>{
      this.parent.refreshEmployee();
     },
     error:(error)=>{
      console.log(error.error.message)
     }
    })
    return this.editemployeeModal.close()
  }

  async openGetEmployeeManagersModal(employeeId: number,employeeName:string) {
    this.modalTitle=employeeName;
    (await this.employeeServices.getEmployeeManager(employeeId)).subscribe(result => {
      this.employeeManagers = result;
    })
    return await this.employeeManagersModal.open()
  }

  async openGetManagerEmployees(employeeId: number,employeeName:string) {
    this.modalTitle=employeeName;
    (await this.employeeServices.getManagerEmployees(employeeId)).subscribe(result => {
      this.managerEmployees = result;
    })
    return await this.managerEmployeeModal.open()
  }

  async Onselect(mangerId:number):Promise<boolean>{
   
    this.isManagerValid= this.managerEmployees.findIndex(emp => emp.id == mangerId) != -1;
    return false;
  }

}
