import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  type:string="password";
  isText: boolean = false;
  eyeIcon: string = "bi-eye";
  loginForm!:FormGroup;
  constructor(private  fb:FormBuilder,private authentication:AuthenticationService,private router:Router){}
  ngOnInit(): void {
    this.loginForm=this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
console.log("");
  }
  hideShowPassword() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "bi-eye-slash" : this.eyeIcon = "bi-eye";
    this.isText ? this.type="text" : this.type="password";
}

onSubmit(){
  if(this.loginForm.valid)
  {
    this.authentication.login(this.loginForm.value)
      .subscribe({
        next:(res=>{
          alert(res.message)
          this.loginForm.reset();
          this.router.navigate(['login'])
        })
        ,error:(err=>{
          alert(err?.error.message)
        })
      })
      console.log(this.loginForm.value);
  }
  else
  {
    this.validateAllFormFields(this.loginForm);
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
}
