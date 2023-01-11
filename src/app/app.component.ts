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
    
  }
  ngOnInit(): void {
    this.authService.identityCheck();
  }
  title = 'EmployeeManagementSystemUI';

  signOut() {
    localStorage.removeItem('token');
    document.location.href="/";
    this.authService.identityCheck();
}
}
