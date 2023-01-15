import { Departments } from "./department";
import { Position } from "./position";

export interface UpdateEmployee {
    id:number
    name: string;
    surname: string;
    birthDate: Date;
    positionId: number[];
    managerId: number;
    departments: Departments[];
}

