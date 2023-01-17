import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { UsermodalComponent } from './usermodal/usermodal.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users:User[]=[]; 
  @ViewChild(UsermodalComponent) modal:UsermodalComponent 
  constructor(private userService:UserService){}
  ngOnInit(): void {
    this.refreshUser();
  }

  refreshUser()
  {
    this.userService.getAllUsers().subscribe(result=>{
      console.log(result);
      this.users=result;
    })
  }

  showPermissionModal(userId:number)
  {
    this.modal.openPermissionModal(userId);
  }


}
