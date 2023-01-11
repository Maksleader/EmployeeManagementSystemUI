import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddEmployee } from '../models/addEmployee';
import { EmployeeInfo } from '../models/EmployeeInfo';

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
  

}
