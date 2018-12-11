import { EmployeeService } from './employee.service';
import { Observable } from 'rxjs';
import { Employee } from './../models/employee.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

export class EmployeeListResolverService implements Resolve<Employee[]>{
    constructor(private _employeeService: EmployeeService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employee[]> {
        return this._employeeService.getEmployees();
    }
}