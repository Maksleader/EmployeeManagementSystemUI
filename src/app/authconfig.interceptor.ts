import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { UserAuthenticationService } from "./services/user-authentication.service";
import { Router } from "@angular/router";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: UserAuthenticationService, private route:Router) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = localStorage.getItem('token');
        if(authToken==null)
        {
            this.route.navigate(['login'])
        }
        req = req.clone({
            setHeaders: {
                Authorization: "Bearer " + authToken
            }
        });
        
        return next.handle(req);
    }
}