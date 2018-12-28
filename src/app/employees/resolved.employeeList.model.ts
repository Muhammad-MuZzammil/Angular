import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

export class ResolvedEmployeeList {
    constructor(public employeeList: any, public error: any = null) { }
}