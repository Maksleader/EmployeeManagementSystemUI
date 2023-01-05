import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, max, take } from 'rxjs';
import { UserInfo } from '../models/UserInfo';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

   userconfig :UserInfo;
  constructor(private http:HttpClient) { }
  
  get getconfig():UserInfo{
    return this.userconfig
   }
  
}

