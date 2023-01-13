import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddEmployee } from '../models/addEmployee';
import { EmployeeInfo } from '../models/EmployeeInfo';
import { EmployeeMangers } from '../models/employeeManagers';
import { ManagerEmployees } from '../models/managerEmployees';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService{

  constructor(
    private http:HttpClient,
    @Inject('baseUrl') private baseUrl: string,
  ) { }

  async getAllEmployees():Promise<EmployeeInfo[]>
  {
    return this.http.get<EmployeeInfo[]>(`${this.baseUrl}/Employee/getAllEmployees`).toPromise().then(data=>{
      return data;
    });
  }

  addEmployee(addEmployeeRequest:AddEmployee):Observable<AddEmployee>
  {
   return this.http.post<AddEmployee>(`${this.baseUrl}/Employee/addEmployee`,addEmployeeRequest)
  }

  getEmployeeManager(employeeId:number):Observable<EmployeeMangers[]>
  {
    return this.http.get<EmployeeMangers[]>(`${this.baseUrl}/Employee/employeemanagers?employeeId=${employeeId}`)
  }

  getManagerEmployees(employeeId:number):Observable<ManagerEmployees[]>
  {
    return this.http.get<ManagerEmployees[]>(`${this.baseUrl}/Employee/managersemployee/employeeId?employeeId=${employeeId}`)
  }

  getEmployee(employeeId:number):Observable<EmployeeInfo>
  {
    return this.http.get<EmployeeInfo>(`${this.baseUrl}/Employee/getEmployee?employeeId=${employeeId}`)
  }

  editemployee(employeeId:number,employee:EmployeeInfo)
  {
    return this.http.patch(`${this.baseUrl}/Employee/employeeId?employeeId=${employeeId}`,employee);
  }
}
