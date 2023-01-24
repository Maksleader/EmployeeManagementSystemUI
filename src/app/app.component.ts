import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "./services/authentication.services";
import { ConfigService } from "./services/config.service";


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})


export class AppComponent {
  constructor(public authService: AuthenticationService, private router: Router, public userInfo: ConfigService) {
    this.authService.identityCheck();
  }
  title = "EmployeeManagementSystemUI";

  signOut() {
    localStorage.removeItem("token");
    document.location.href = "/";
    this.authService.identityCheck();
  }

  gotoProfile() {
    if (this.authService.isAuthenticated == true) {
      document.location.href = "userProfile"
    }

  }

}
