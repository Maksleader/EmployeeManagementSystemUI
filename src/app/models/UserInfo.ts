import { Permission } from "./permission";

export class UserInfo
{
    allpermissions:string[]
    user:{
        id:number;
        firstName:string;
        lastName:string;
        userName:string;
        email:string;
        userPermissions:Permission[];
    }
   
    
}