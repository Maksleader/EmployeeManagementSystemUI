import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {
  private endpoint: string = "https://localhost:7180/api/User"
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  private tokenKey = "token";
  constructor(private http: HttpClient) { }
  signUp(userObject: any) {
    return this.http.post(`${this.endpoint}/register`,userObject,
    {
      observe:"response"
    });
  }

 async login(loginObject:FormBuilder,callBackFunction?: () => void
  ): Promise<any> {
   this.http.post(`${this.endpoint}/login`,loginObject,{responseType: 'text'}).
   subscribe({
    next:(token)=>{
      localStorage.setItem(this.tokenKey,token);
      callBackFunction();
     }
   })
  }
}

