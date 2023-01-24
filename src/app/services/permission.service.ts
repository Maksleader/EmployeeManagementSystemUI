import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Permission } from "../models/permission";

@Injectable({
  providedIn: "root"
})
export class PermissionService {

  constructor(private http: HttpClient, @Inject("baseUrl") private baseUrl: string) { }

  getAllPermissions(): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${this.baseUrl}/Permission/getAllPermissions`)
  }
}
