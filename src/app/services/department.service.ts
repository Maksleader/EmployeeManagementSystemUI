import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http:HttpClient, @Inject('baseUrl') private baseUrl: string) { }

 

  getAllDepartments()
{
  return this.http.get(`${this.baseUrl}/Department/getAllDepartments`)
}
}
