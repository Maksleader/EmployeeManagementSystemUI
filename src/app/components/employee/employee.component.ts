import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
  user: any;
  @ViewChild(EmployeemodalComponent) modal:EmployeemodalComponent
  @Input() searchStatusRxx = new BehaviorSubject(false);
  constructor(private employeeServices:EmployeeService,private cdr:ChangeDetectorRef){}

 async ngOnInit():Promise<any> {
  await this.employeeServices.getAllEmployees().then(data=>{
    this.employees=data;
  })
 }
  show(){
   this.modal.openModal();
  }

  getConfirmationValue(value: any) {
    if (value == 'Save click') {
      location.reload();
    }
  }

}
