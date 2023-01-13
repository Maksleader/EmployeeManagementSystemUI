import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  @ViewChild(EmployeemodalComponent) modal:EmployeemodalComponent
  @Input() searchStatusRxx = new BehaviorSubject(false);


  constructor(private employeeServices:EmployeeService,
    private cdr:ChangeDetectorRef,
    private route:ActivatedRoute){}

 async ngOnInit():Promise<any> {
  await this.employeeServices.getAllEmployees().then(data=>{
    this.employees=data;
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

  getConfirmationValue(value: any) {
    if (value == 'Save click') {
      location.reload();
    }
  }

}
