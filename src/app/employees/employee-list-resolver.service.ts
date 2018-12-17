import { map, catchError} from 'rxjs/operators';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { EmployeeService } from './employee.service';
import { ResolvedEmployeeList } from './resolved.employeeList.model';


@Injectable()
export class EmployeeListResolverService implements Resolve<ResolvedEmployeeList> {
    constructor(private _employeeService: EmployeeService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResolvedEmployeeList> {
        return this._employeeService.getEmployees()
            .pipe(
                map((employeeList) => new ResolvedEmployeeList(employeeList)),
                catchError((err: any) => Observable.of(new ResolvedEmployeeList(null, err)))
            );
    }
}