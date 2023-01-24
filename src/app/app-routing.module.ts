import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./authguard";
import { DepartmentComponent } from "./components/department/department.component";
import { EmployeeComponent } from "./components/employee/employee.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { PositionComponent } from "./components/position/position.component";
import { SignupComponent } from "./components/signup/signup.component";
import { UserComponent } from "./components/user/user.component";
import { UserProfileComponent } from "./components/userprofile/userprofile.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "employee", component: EmployeeComponent, data: { permission: "Employees" }, canActivate: [AuthGuard] },
  { path: "userProfile", component: UserProfileComponent, data: { permission: "Users" }, canActivate: [AuthGuard] },
  { path: "position", component: PositionComponent, data: { permission: "Positions" }, canActivate: [AuthGuard] },
  { path: "department", component: DepartmentComponent, data: { permission: "Departments" }, canActivate: [AuthGuard] },
  { path: "users", component: UserComponent, data: { permission: "Users" }, canActivate: [AuthGuard] },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
