import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { EmployeeInfo } from "src/app/models/EmployeeInfo";
import { ConfigService } from "src/app/services/config.service";
import { EmployeeInfoService } from "src/app/services/employee-info.service";


@Component({
  selector: "app-userprofile",
  templateUrl: "./userprofile.component.html",
  styleUrls: ["./userprofile.component.scss"]
})
export class UserProfileComponent implements OnInit {
  employee: EmployeeInfo
  employeeAge: number
  constructor(public employeeInfo: EmployeeInfoService, public userInfo: ConfigService, private toastr: ToastrService) { }

  ngOnInit() {
    this.employeeInfo.getEmployeeInfo().subscribe({
      next: (result => {
        this.employee = result;
        this.employeeAge = this.getAge(result.birthDate);
      }),
      error: (error => {
        this.toastr.error(error.error.message, "UserProfile")
      })
    });

  }

  public getAge(dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

}

