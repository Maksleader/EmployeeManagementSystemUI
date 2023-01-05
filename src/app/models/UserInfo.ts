
export class UserInfo
{
    allpermissions:string[]
    user:{
        id:number;
        firstName:string;
        lastName:string;
        userName:string;
        email:string;
        userPermissions:string[];
        createDate:string
        employee:{
            id: number;
            name: string;
            surname:string
            birthDate:string;
            position:string;
            manger:string;
            department:string[];
        }
    }
   
    
}