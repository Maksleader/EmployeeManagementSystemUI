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
@Component({
  selector: 'app-employeemodal',
  templateUrl: './employeemodal.component.html',
  styleUrls: ['./employeemodal.component.scss'],
})
export class EmployeemodalComponent implements OnInit {
  allpositions: any;
  employees: EmployeeInfo[] = [];
  alldepartments:Departments[]=[];
  addEmployeeRequest: AddEmployee = {
    name: '',
    surname: '',
    birthDate: null,
    positionId: null,
    managerId: null,
    employeeDepartments: []
  };
  dropdownSettings:IDropdownSettings;

  employeeManagers:EmployeeMangers[]=[];
  managerEmployees:ManagerEmployees[]=[];

  employee:EmployeeInfo={
    id: null,
    name: '',
    surname: '',
    birthDate: null,
    position: '',
    manager: '',
    employeeDepartments: [],
  }

  updateEmployee:AddEmployee={
    name: '',
    surname: '',
    birthDate: null,
    positionId: null,
    managerId: null,
    employeeDepartments: []
  }

  @ViewChild('addemployee') private addemployeeModal: SharedModalComponent
  @ViewChild('edit') private editemployeeModal: SharedModalComponent
  @ViewChild('getemployeeMangers') private employeeManagersModal: SharedModalComponent
  @ViewChild('getMangerEmployee') private managerEmployeeModal: SharedModalComponent
  @Output() newConfirmationEvent = new EventEmitter<string>();
  @Input()modalType:any;

  constructor(
    private employeeServices: EmployeeService,
    private postionService: PositionService,
    private departmentService: DepartmentService,) { }

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
      console.log(this.allpositions);
    })


    this.departmentService.getAllDepartments().subscribe(result => {
      this.alldepartments = result;
    });

    await this.employeeServices.getAllEmployees().then(data => {
      this.employees = data;
    });

    return await this.addemployeeModal.open()
  }

  async openEditModal(employeeId:number)
  {
    this.employeeServices.getEmployee(employeeId).subscribe(result=>{
      this.employee=result;
    })

    console.log(this.employee);
    this.postionService.getAllPostions().subscribe(result => {
      this.allpositions = result;
      console.log(this.allpositions);
    })


    this.departmentService.getAllDepartments().subscribe(result => {
      this.alldepartments = result;
    });

    await this.employeeServices.getAllEmployees().then(data => {
      this.employees = data;
    });

    return await this.editemployeeModal.open()
  }

  async openGetEmployeeManagersModal(employeeId:number)
  {
    this.employeeServices.getEmployeeManager(employeeId).subscribe(result=>
      {
        this.employeeManagers=result;
      })
    return await this.employeeManagersModal.open()
  }

  async openGetManagerEmployees(employeeId:number)
  {
    this.employeeServices.getManagerEmployees(employeeId).subscribe(result=>
      {
        this.managerEmployees=result;
      })
    return await this.managerEmployeeModal.open()
  }
  getConfirmationValue(value: any,modaltype:any) {
    if (value == 'Save click') {
      if(modaltype=='addemployee')
      {
        this.addEmployeeRequest.name = this.addEmployeeRequest.name.trim();
        this.addEmployeeRequest.surname = this.addEmployeeRequest.surname.trim();
        this.employeeServices.addEmployee(this.addEmployeeRequest).subscribe({
          error: (error) => {
            console.log(error);
          }
        });
      }
      if(modaltype=='edit')
      {
        console.log(this.updateEmployee);
        this.employeeServices.editemployee(this.employee.id,this.employee).subscribe({
          error: (error) => {
            console.log(error);
          }
        });
      }
   
      //this.newConfirmationEvent.emit(value);
    }
  }




}
