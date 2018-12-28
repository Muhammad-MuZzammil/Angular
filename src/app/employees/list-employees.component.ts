<<<<<<< HEAD
import { EmployeeService } from './employee.service';
import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
=======
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { ResolvedEmployeeList } from './resolved.employeeList.model';
>>>>>>> c8dcffd66ece7168d4bd22500fa85f63747c699d

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
<<<<<<< HEAD
export class
  ListEmployeesComponent implements OnInit {
  employees: Employee[];
  constructor(private _employeeService: EmployeeService) { }

  ngOnInit() {
    this.employees = this._employeeService.getEmployee()
=======
export class ListEmployeesComponent implements OnInit {
  employees: Employee[];
  error: string
  private _searchTerm: string
  filteredEmployees: Employee[];
  get searchTerm(): string {
    return this._searchTerm
  }
  set searchTerm(value: string) {
    this._searchTerm = value
    this.filteredEmployees = this.filtereEmployees(value)
  }
  filtereEmployees(searchString: string) {
    return this.employees.filter(employee =>
      employee.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }
  constructor(private _router: Router, private _route: ActivatedRoute) {
    const resolvedEmployeeList: ResolvedEmployeeList = this._route.snapshot.data['employeeList'];

    // If the resolver completed without errors resolvedData is an Employee[]
    if (resolvedEmployeeList.error ==null) {
      this.employees = resolvedEmployeeList.employeeList;
    } else {
      this.error = resolvedEmployeeList.error;
    }
    this._route.queryParamMap.subscribe(queryParams => {
      if (queryParams.has('searchTerm')) { //has is used to know searchTerm exist or nt it returns boolean
        this.searchTerm = queryParams.get('searchTerm') // get return searchTerm Value
      }
      else {
        this.filteredEmployees = this.employees
      }
    })
  }

  ngOnInit() {
  }

  onDeleteNotification(id: number) {
    const i = this.filteredEmployees.findIndex(e => e.id == id)
    if (i !== -1) {
      this.filteredEmployees.splice(i, 1)
    }
>>>>>>> c8dcffd66ece7168d4bd22500fa85f63747c699d
  }

}
