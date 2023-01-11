import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  private tokenKey = "token";
  constructor(
    private http: HttpClient,
    @Inject('baseUrl') private baseUrl: string
    ) { }
  signUp(userObject: any) {
    return this.http.post(`${this.baseUrl}/User/register`,userObject,
    {
      observe:"response"
    });
  }

 async login(loginObject:FormBuilder,callBackFunction?: () => void
  ): Promise<any> {
   this.http.post(`${this.baseUrl}/User/login`,loginObject,{responseType: 'text'}).
   subscribe({
    next:(token)=>{
      localStorage.setItem(this.tokenKey,token);
      callBackFunction();
     }
   })
  }
}

