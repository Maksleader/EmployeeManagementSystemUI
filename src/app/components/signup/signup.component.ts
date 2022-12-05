import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  type: string = "password";
  eyeIcon: string = "bi-eye";
  signUpForm!: FormGroup
  constructor(private fb: FormBuilder,private authentication:AuthenticationService,private router:Router) {
    {
     
    }
  }
  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email:["",[Validators.required,Validators.email]],
      userName: ["", Validators.required],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required]
    },
    {
      validators:this.PasswordMatcher('password','confirmPassword')
    }
    )
  }
  
  onSignUp(){
    if(this.signUpForm.valid)
    {
      this.authentication.signUp(this.signUpForm.value)
      .subscribe({
        next:(res=>{
          alert(res.message)
          this.signUpForm.reset();
          this.router.navigate(['login'])
        })
        ,error:(err=>{
          alert(err?.error.message)
        })
      })
      console.log(this.signUpForm.value);
    }

    else
    {
      this.validateAllFormFields(this.signUpForm);
    }
  }
  
  private validateAllFormFields(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field=>{
      const control=formGroup.get(field);
      if(control instanceof FormControl)
      {
        control.markAsDirty({onlySelf:true})
      }
      else if(control instanceof FormGroup)
      {
        this.validateAllFormFields(control);
      }
    })
  }

  PasswordMatcher(password: any, confirmPassword: any) {
    return (formGroup: FormGroup) => {
      const passwordControl=formGroup.controls[password];
      const confirmPasswordControl=formGroup.controls[confirmPassword];
      if(confirmPasswordControl.errors && !confirmPasswordControl.errors['PasswordMatcher'])
      {
        return;
      }

      if(passwordControl.value!=confirmPasswordControl.value)
      {
        confirmPasswordControl.setErrors({PasswordMatcher:true});
      }
      else{
        confirmPasswordControl.setErrors(null);
      }
    };
  }

}

