import { HttpClient } from '@angular/common/http';
import {Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/models/UserInfo';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  userInfo:UserInfo =this.config.getconfig;
constructor(public config:ConfigService,http:HttpClient){}
 
ngOnInit(): void {
    console.log(this.userInfo)
} 
public getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}
}
