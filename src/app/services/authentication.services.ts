import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private jwtHelperService: JwtHelperService,private userInfo:ConfigService) {}

  identityCheck() {
    const token: string = localStorage.getItem('token');
    let isExpired: boolean;
    try {
      isExpired = this.jwtHelperService.isTokenExpired(token);
    } catch {
      isExpired = true;
    }
    _isAuthenticated = token != null && !isExpired;
  }

  get isAuthenticated(): boolean {
    return _isAuthenticated;
  }

  public hasPermission(permission: string): boolean {
    if (this.userInfo.userconfig.user != null) {
      return this.userInfo.userconfig.user.userPermissions.findIndex(p => p.name == permission) != -1;
    }
    return false;
  }

  
}

export let _isAuthenticated: boolean;