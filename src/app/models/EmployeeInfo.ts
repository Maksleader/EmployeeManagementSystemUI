import { Departments } from "./department";

export interface EmployeeInfo {

    id: number;
    name: string;
    surname: string;
    birthDate: Date;
    position: string;
    manager: string;
    employeeDepartments: Departments[];
}

