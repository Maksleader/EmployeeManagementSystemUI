import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { EmployeeInfo } from 'src/app/models/EmployeeInfo';
import { ConfigService } from 'src/app/services/config.service';
import { EmployeeInfoService } from 'src/app/services/employee-info.service';


@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserProfileComponent implements OnInit {
  employee: EmployeeInfo
  employeeAge:number
  constructor(public employeeInfo: EmployeeInfoService,public userInfo:ConfigService) { }

  ngOnInit() {
    this.employeeInfo.getEmployeeInfo().subscribe({
      next:(result=>{
        this.employee=result;
        console.log(this.employee);
    this.employeeAge=this.getAge(result.birthDate);
      })
    });

  }

  public getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }

}

