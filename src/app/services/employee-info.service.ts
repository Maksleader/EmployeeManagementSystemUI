import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { EmployeeInfo } from "../models/EmployeeInfo";

@Injectable({
  providedIn: "root"
})
export class EmployeeInfoService {


  constructor(
    private http: HttpClient,
    @Inject("baseUrl") private baseUrl: string) { }

  get employee() {
    return _employeeInfo;
  }


  getEmployeeInfo() {
    return this.http.get<EmployeeInfo>(`${this.baseUrl}/UserProfile/getEmployeeInfo`)
  }
}

export let _employeeInfo: EmployeeInfo
