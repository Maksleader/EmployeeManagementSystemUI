import { Departments } from "./department";

export interface EmployeeInfo {

    id: number;
    name: string;
    surname: string;
    birthDate: string;
    position: string;
    manager: string;
    employeeDepartments: Departments[];
}

