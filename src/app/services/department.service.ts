import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Departments } from "../models/department";

@Injectable({
  providedIn: "root"
})
export class DepartmentService {

  constructor(private http: HttpClient, @Inject("baseUrl") private baseUrl: string) { }

  getAllDepartments() {
    return this.http.get<Departments[]>(`${this.baseUrl}/Department/getAllDepartments`)
  }


  addDepartment(departmentRequest: Departments): Observable<Departments> {
    return this.http.post<Departments>(`${this.baseUrl}/Department/createDepartment`, departmentRequest);
  }

  editDepartment(departmentRequest: Departments): Observable<Departments> {
    return this.http.patch<Departments>(`${this.baseUrl}/Department/departmentUpdate/departmentId`, departmentRequest)
  }

  getDepartment(departmentId: number): Observable<Departments> {
    return this.http.get<Departments>(`${this.baseUrl}/Department/getDepartment/departmentId?departmentId=${departmentId}`)
  }

  deleteDepartment(departmentId: number) {
    return this.http.delete(`${this.baseUrl}/Department/deleteDepartment/departmentId?departmentId=${departmentId}`)
  }
}

