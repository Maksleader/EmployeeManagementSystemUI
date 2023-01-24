import { Inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormBuilder } from "@angular/forms";

@Injectable({
  providedIn: "root"
})
export class UserAuthenticationService {
  headers = new HttpHeaders().set("Content-Type", "application/json");
  private tokenKey = "token";
  constructor(
    private http: HttpClient,
    @Inject("baseUrl") private baseUrl: string
  ) { }
  signUp(userObject: any) {
    return this.http.post(`${this.baseUrl}/Authentication/register`, userObject,
      {
        observe: "response",
      });
  }

  async login(loginObject: FormBuilder) {
    return this.http.post(`${this.baseUrl}/Authentication/login`, loginObject, { responseType: "text" })
  }
}

