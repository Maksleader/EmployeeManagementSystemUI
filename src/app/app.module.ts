import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component"
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HomeComponent } from "./components/home/home.component";
import { InitModule } from "src/app/init.module";
import { AuthInterceptor } from "./authconfig.interceptor";
import { JwtModule } from "@auth0/angular-jwt";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { UserProfileComponent } from "./components/userprofile/userprofile.component";
import { EmployeeComponent } from "./components/employee/employee.component";
import { EmployeemodalComponent } from "./components/employee/employeemodal/employeemodal.component";
import { ModalsModule } from "./modals/modals.module";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { NgSelectModule } from "@ng-select/ng-select";
import { PositionComponent } from "./components/position/position.component";
import { PositionmodalComponent } from "./components/position/positionmodal/positionmodal.component";
import { DepartmentComponent } from "./components/department/department.component";
import { DepartmentmodalComponent } from "./components/department/departmentmodal/departmentmodal.component";
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { UserComponent } from "./components/user/user.component";
import { UsermodalComponent } from "./components/user/usermodal/usermodal.component";
import { ToastrModule } from "ngx-toastr";
import { SignupComponent } from "./components/signup/signup.component";
import { DateFormatPipe } from "./pipes/date.pipe";
import { DateTimeFormatPipe } from "./pipes/dateTime.pipe";
import { GlobalConstants } from "./models/globalConstants";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    UserProfileComponent,
    EmployeeComponent,
    EmployeemodalComponent,
    PositionComponent,
    PositionmodalComponent,
    DepartmentComponent,
    DepartmentmodalComponent,
    UserComponent,
    UsermodalComponent,
    DateFormatPipe,
    DateTimeFormatPipe
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    HttpClientModule,
    InitModule,
    FormsModule,
    ModalsModule,
    ToastrModule.forRoot(),
    NgSelectModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem("accessToken"),
        allowedDomains: [GlobalConstants.apiURL],
      },
    }),
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: "baseUrl",
      useValue: GlobalConstants.apiURL,
      multi: true,
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

