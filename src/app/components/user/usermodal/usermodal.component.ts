import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ModalConfig } from 'src/app/modals/modalConfig';
import { SharedModalComponent } from 'src/app/modals/shared-modal/shared-modal.component';
import { AddPermissionToUser } from 'src/app/models/addPersmissionToUser';
import { Permission } from 'src/app/models/permission';
import { User } from 'src/app/models/user';
import { ConfigService } from 'src/app/services/config.service';
import { ModalconfigService } from 'src/app/services/modalconfig.service';
import { PermissionService } from 'src/app/services/permission.service';
import { UserService } from 'src/app/services/user.service';
import { UserComponent } from '../user.component';

@Component({
  selector: 'app-usermodal',
  templateUrl: './usermodal.component.html',
  styleUrls: ['./usermodal.component.scss']
})
export class UsermodalComponent implements OnInit {
  dropdownSettings: IDropdownSettings;
  allpermissions: Permission[] = [];
  user:AddPermissionToUser={
    userId: 0,
    userPermissions: []
  };

  @ViewChild('permission') private permissionModal: SharedModalComponent
  @Input() parent: UserComponent
  constructor(private userInfo: ConfigService, 
    private permissionService: PermissionService,
    private userService:UserService,
    public modalConfig:ModalconfigService) { }

  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 6,
      allowSearchFilter: false
    };


  }


  openPermissionModal(userId: number) {
    this.permissionService.getAllPermissions().subscribe(result => {
      this.allpermissions = result;
    });

    this.userService.getUser(userId).subscribe(result=>{
      console.log(result)
      this.user={
        userId:result.id,
        userPermissions:result.userPermissions
      }
      console.log(this.user);
    })
    this.permissionModal.open();
  }

  addOrDeletePermisionFromUser() {
    this.userService.addOrDeletePermission(this.user).subscribe(res=>{
      this.parent.refreshUser();
    })
  }
}
