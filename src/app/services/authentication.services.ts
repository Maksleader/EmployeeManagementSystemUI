import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
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

  public checkuserpermission(permission:string):boolean
  {
    if(this.userInfo.userconfig.user!=null)
    {
      let userpermissions=this.userInfo.userconfig.user.userPermissions;
      for(let per of userpermissions)
      {
        if(per==permission)
        {
          return true;
          break;
        }
      }
    }
    return false;
  }
}

export let _isAuthenticated: boolean;