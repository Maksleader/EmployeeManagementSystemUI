import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { SharedModalComponent } from 'src/app/modals/shared-modal/shared-modal.component';
import { AddEmployee } from 'src/app/models/addEmployee';
import { EmployeeInfo } from 'src/app/models/EmployeeInfo';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { PositionService } from 'src/app/services/position.service';
@Component({
  selector: 'app-employeemodal',
  templateUrl: './employeemodal.component.html',
  styleUrls: ['./employeemodal.component.scss'],
})
export class EmployeemodalComponent implements OnInit {
  allpositions: any;
  employees: EmployeeInfo[] = [];
  alldepartments: any;
  addEmployeeRequest: AddEmployee = {
    name: '',
    surname: '',
    birthDate: null,
    positionId: null,
    managerId: null,
    employeeDepartments: []
  };
  constructor(
    private employeeServices: EmployeeService,
    private postionService: PositionService,
    private departmentService: DepartmentService) { }

  ngOnInit(): void { 
   
  }

  @ViewChild('addemployee') private modalComponent: SharedModalComponent
  @Output() newConfirmationEvent = new EventEmitter<string>();
  async openModal() {
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

    return await this.modalComponent.open()
  }

  getConfirmationValue(value: any) {
    if (value == 'Save click') {
      this.addEmployeeRequest.name = this.addEmployeeRequest.name.trim();
      this.addEmployeeRequest.surname = this.addEmployeeRequest.surname.trim();
      this.addEmployee();
      this.newConfirmationEvent.emit(value);
      console.log(this.addEmployeeRequest);
    }
  }

  addEmployee() {
    this.employeeServices.addEmployee(this.addEmployeeRequest).subscribe({
      error: (error) => {
        console.log(error);
      }
    });
  }

}
