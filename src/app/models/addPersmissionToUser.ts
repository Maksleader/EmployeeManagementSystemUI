import { Permission } from "./permission"

export interface AddPermissionToUser
{
    userId:number
    userPermissions:Permission[]
}