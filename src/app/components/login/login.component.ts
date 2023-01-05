import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthenticationService } from 'src/app/services/user-authentication.service';
import { ConfigService } from 'src/app/services/config.service';
import { AuthenticationService } from 'src/app/services/authentication.services';

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
  constructor(
    private  fb:FormBuilder,

    public userAuthentication:UserAuthenticationService,
    private router:Router, public config:ConfigService,
    private activatedRoute: ActivatedRoute,
    private authentication:AuthenticationService){}
    
  ngOnInit(): void {
    this.loginForm=this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }
  hideShowPassword() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "bi-eye-slash" : this.eyeIcon = "bi-eye";
    this.isText ? this.type="text" : this.type="password";
}

async onSubmit(){

    await this.userAuthentication.login(this.loginForm.value,()=>{
      this.authentication.identityCheck();
      location.reload();
    });
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
