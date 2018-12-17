import { Employee } from './../models/employee.model';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
@Injectable()
export class EmployeeService {
  constructor(private httpClient: HttpClient) {

  }
  private listEmployee: Employee[] = [
    {
      id: 1,
      name: 'Mark',
      gender: 'Male',
      contactPreference: 'Email',
      email: 'mark@pragimtech.com',
      dateOfBirth: new Date('10/25/1988'),
      department: '3',
      isActive: true,
      photoPath: '../../assets/images/mark.png'
    },
    {
      id: 2,
      name: 'Mary',
      gender: 'Female',
      contactPreference: 'Phone',
      phoneNumber: 2345978640,
      dateOfBirth: new Date('11/20/1979'),
      department: '2',
      isActive: true,
      photoPath: '../../assets/images/mary.png'
    },
    {
      id: 3,
      name: 'John',
      gender: 'Male',
      contactPreference: 'Phone',
      phoneNumber: 5432978640,
      dateOfBirth: new Date('3/25/1976'),
      department: '3',
      isActive: false,
      photoPath: '../../assets/images/john.png'
    },
  ]
  getEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>('http://localhost:3000/employees1')
        .pipe(catchError(this.handleError));
  }
  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
        console.error('Client Side Error :', errorResponse.error.message);
    } else {
        console.error('Server Side Error :', errorResponse);
    }
    // return an observable with a meaningful error message to the end user
    return  throwError('There is a problem with the service We are notified & working on it. Please try again later.');
}
  getEmployee(id: number): Employee {
    return this.listEmployee.find(e => e.id === id)
  }
  save(employee: Employee) {
    if (employee.id === null) {
      const maxId = this.listEmployee.reduce(function (e1, e2) {
        return (e1 > e2) ? e1 : e2
      }).id;
      employee.id = maxId + 1
      this.listEmployee.push(employee);
    }
    else {
      const foundIndex = this.listEmployee.findIndex(e => e.id === employee.id)
      this.listEmployee[foundIndex] = employee;
    }
  }
  deleteEmployee(id: number) {
    const i = this.listEmployee.findIndex(e => e.id === id)
    if (i !== -1) {
      this.listEmployee.splice(i, 1)
    }
  }
}
