import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  employees: Employee[];
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
    this.employees = this._route.snapshot.data['employeeList'];
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
  
  
 
}
