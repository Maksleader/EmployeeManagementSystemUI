import { Departments } from "./department";
export class UpdateEmployee {
    id:number
    name: string;
    surname: string;
    birthDate: string;
    positionId: number[];
    managerId: number;
    departments: Departments[];
}

