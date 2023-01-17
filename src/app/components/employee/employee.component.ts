import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeInfo } from 'src/app/models/EmployeeInfo';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployeemodalComponent } from './employeemodal/employeemodal.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  employees:EmployeeInfo[]=[];

  @ViewChild(EmployeemodalComponent) modal:EmployeemodalComponent

  constructor(private employeeServices:EmployeeService){}

  ngOnInit() {
  this.refreshEmployee();
 }

  refreshEmployee()
 {
  this.employeeServices.getAllEmployees().subscribe({
    next:(result=>{
      this.employees=result;
    })
  })
  }
    
  showAddemployeeModal(){
   this.modal.openAddEmployeeModal();
  }

  showeditModal(employeeId:number){
    this.modal.openEditModal(employeeId);
  }

  showEmployeeManagersModal(employeeId:number){

    this.modal.openGetEmployeeManagersModal(employeeId);
  }

  showManagerEmployeeModal(employeeId:number){

    this.modal.openGetManagerEmployees(employeeId);
  }


  showDeleteModal(employeeId:number){
    this.modal.openDeleteModal(employeeId);
  }

}
