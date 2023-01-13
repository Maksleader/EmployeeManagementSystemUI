import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Departments } from '../models/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http:HttpClient, @Inject('baseUrl') private baseUrl: string) { }

 

  getAllDepartments()
{
  return this.http.get<Departments[]>(`${this.baseUrl}/Department/getAllDepartments`)
}
}
