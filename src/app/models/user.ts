import { Permission } from "./permission";

export interface User{
    id:number;
    firstName:string;
    lastName:string;
    userName:string;
    email:string;
    userPermissions:Permission[];
}