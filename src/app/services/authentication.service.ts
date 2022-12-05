import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl: string = "https://localhost:7180/api/User/"
  constructor(private http: HttpClient) { }
  signUp(userObject:any) {
    return this.http.post<any>(`${this.baseUrl}register`,userObject)
  }

  login(loginObject:any) {
    return this.http.post<any>(`${this.baseUrl}login`,loginObject)
  }
}
