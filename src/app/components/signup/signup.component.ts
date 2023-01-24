import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UserAuthenticationService } from "src/app/services/user-authentication.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {
  type: string = "password";
  eyeIcon: string = "bi-eye";
  signUpForm!: FormGroup;
  emailError: string
  constructor(private fb: FormBuilder, private authentication: UserAuthenticationService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.signUpForm = this.fb.group({
      firstName: ["", [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      lastName: ["", [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      email: ["", [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      userName: ["", Validators.required],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required]
    },
      {
        validators: this.PasswordMatcher("password", "confirmPassword")
      }
    )
  }

  onSignUp() {

    if (this.signUpForm.valid) {
      this.authentication.signUp(this.signUpForm.value)
        .subscribe({
          next: (() => {
            this.signUpForm.reset();
            document.location.href = "/";
          }),
          error: (err => {
            this.toastr.error(err.error.message, "SignUp");
          }),
        })
    }
    else {
      this.validateAllFormFields(this.signUpForm);
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

  PasswordMatcher(password: any, confirmPassword: any) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];
      if (confirmPasswordControl.errors && !confirmPasswordControl.errors["PasswordMatcher"]) {
        return;
      }

      if (passwordControl.value != confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ PasswordMatcher: true });
      }
      else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }
}

