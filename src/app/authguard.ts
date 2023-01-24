import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot, RouterStateSnapshot,
  CanActivate, Router
} from "@angular/router";

import { AuthenticationService, _isAuthenticated } from "./services/authentication.services";
@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(
    public authService: AuthenticationService,
    public router: Router,
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    this.authService.identityCheck();
    if (!_isAuthenticated) {
      this.router.navigate(["login"], {
        queryParams: { returnUrl: state.url },
      });
    }
    if (route.data["permission"] != null) {
      const hasPermission = this.authService.hasPermission(route.data["permission"])

      if (hasPermission == false && _isAuthenticated == true) {
        this.router.navigate([""])
      }
    }

    return true;
  }
}



