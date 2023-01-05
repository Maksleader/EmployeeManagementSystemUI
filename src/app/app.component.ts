import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  constructor(public authService:AuthenticationService, private router:Router) {
    this.authService.identityCheck();
  }
  ngOnInit(): void {
    this.router.navigate([''])
  }
  title = 'EmployeeManagementSystemUI';

  signOut() {
    localStorage.removeItem('token');
    location.reload();
    this.authService.identityCheck();
    this.router.navigate(['login']);
}
}
