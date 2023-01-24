import { Departments } from "./department";

export class AddEmployee {
    name: string;
    surname: string;
    birthDate: Date;
    positionId: number;
    managerId: number;
    employeeDepartments: Departments[]
}

