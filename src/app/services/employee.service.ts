import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AddEmployee } from '../models/addEmployee';
import { EmployeeInfo } from '../models/EmployeeInfo';
import { EmployeeMangers } from '../models/employeeManagers';
import { ManagerEmployees } from '../models/managerEmployees';
import { UpdateEmployee } from '../models/updateEmployee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http: HttpClient,
    @Inject('baseUrl') private baseUrl: string,
  ) { }


  getAllEmployees(): Observable<EmployeeInfo[]> {
    return this.http.get<EmployeeInfo[]>(`${this.baseUrl}/Employee/getAllEmployees`);
  }

  addEmployee(addEmployeeRequest: AddEmployee) {
    return this.http.post<AddEmployee>(`${this.baseUrl}/Employee/addEmployee`, addEmployeeRequest)
  }

  async getEmployeeManager(employeeId: number) {
    return this.http.get<EmployeeMangers[]>(`${this.baseUrl}/Employee/employeemanagers?employeeId=${employeeId}`)
  }

  async getManagerEmployees(employeeId: number) {
    return this.http.get<ManagerEmployees[]>(`${this.baseUrl}/Employee/managersemployee/employeeId?employeeId=${employeeId}`)
  }

  async getEmployee(employeeId: number) {
    return this.http.get<UpdateEmployee>(`${this.baseUrl}/Employee/getEmployee?employeeId=${employeeId}`)
  }

  editEmployee(employeeId: number, employee: UpdateEmployee) {
    return this.http.patch(`${this.baseUrl}/Employee/employeeId?employeeId=${employeeId}`, employee);
  }

  async deleteEmployee(employeeId: number) {
    return this.http.delete(`${this.baseUrl}/Employee/employeeId?employeeId=${employeeId}`)
  }
}
