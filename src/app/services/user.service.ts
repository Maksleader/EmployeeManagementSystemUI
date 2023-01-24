import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AddPermissionToUser } from "../models/addPersmissionToUser";
import { User } from "../models/user";

@Injectable({
  providedIn: "root"
})
export class UserService {

  constructor(private http: HttpClient, @Inject("baseUrl") private baseUrl: string,) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/User/getAllUsers`);
  }

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/User/getUser/userId?userId=${userId}`)
  }

  addOrDeletePermission(user: AddPermissionToUser) {
    return this.http.post<AddPermissionToUser>(`${this.baseUrl}/User/addPermissions `, user)
  }
}
