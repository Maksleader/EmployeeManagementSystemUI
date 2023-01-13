import { Departments } from "./department";

export interface AddEmployee {

    name: string;
    surname: string;
    birthDate: Date;
    positionId: number;
    managerId: number;
    employeeDepartments: Departments[];
}

