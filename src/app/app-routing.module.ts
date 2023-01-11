import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authguard';
import { EmployeeComponent } from './components/employee/employee.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/userprofile/userprofile.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "", component: HomeComponent, canActivate: [AuthGuard] },
  {path:"employee",component:EmployeeComponent},
  {path:"userProfile",component:UserProfileComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
