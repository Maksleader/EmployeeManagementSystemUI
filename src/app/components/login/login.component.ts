import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UserAuthenticationService } from "src/app/services/user-authentication.service";
import { ConfigService } from "src/app/services/config.service";
import { AuthenticationService } from "src/app/services/authentication.services";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "bi-eye";
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    public userAuthentication: UserAuthenticationService,
    public config: ConfigService, private authService: AuthenticationService, private activatedRoute: ActivatedRoute, private router: Router) { }
  private tokenKey = "token";
  isLoginInfo: boolean = true;
  returnUrl: string;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ["", Validators.required]
    })

  }
  hideShowPassword() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "bi-eye-slash" : this.eyeIcon = "bi-eye";
    this.isText ? this.type = "text" : this.type = "password";
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      (await this.userAuthentication.login(this.loginForm.value)).subscribe({
        next: (token) => {
          const returnUrl = this.activatedRoute.snapshot.queryParamMap.get("returnUrl") || "/";
          localStorage.setItem(this.tokenKey, token);
          this.authService.identityCheck();
          document.location.href = returnUrl;
        },
        error: () => {
          this.isLoginInfo = false;
        }
      })
    }
    else {
      this.validateAllFormFields(this.loginForm);
    }
  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true })
      }
      else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    })
  }
}
