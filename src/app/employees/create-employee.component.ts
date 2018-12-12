import { EmployeeService } from './employee.service';
import { Employee } from './../models/employee.model';
import { Department } from './../models/department.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  @ViewChild('employeeForm') public createEmployeeForm: NgForm
  photoPreview = false
  employee: Employee
  panelTitle:string
  datePickerConfig: Partial<BsDatepickerConfig>
  deparmtents: Department[] = [
    { id: 1, name: "Help Desk" },
    { id: 2, name: "HR" },
    { id: 3, name: "IT" },
    { id: 4, name: "Payroll" },
    { id: 5, name: "Admin" }
  ]
  constructor(
    private _emloyeeService: EmployeeService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        dateInputFormat: "DD/MM/YYYY"
      });
  }

  togglePhotoPreview() {
    this.photoPreview = !this.photoPreview;
  }
  ngOnInit() {
    this._route.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('id')
      this.getEmployee(id)
    })
  }
  getEmployee(id: number) {
    if (id === 0) {
      this.employee = {
        id: null,
        name: null,
        gender: null,
        email: null,
        phoneNumber: null,
        contactPreference: null,
        dateOfBirth: null,
        department: 'select',
        isActive: null,
        photoPath: null,
        // password: null,
        // confirmPassword: null
      }
      this.createEmployeeForm.reset()
      this.panelTitle = 'Create Employee'
    }
    else {
      
      this.panelTitle = 'Edit Employee'
      this.employee = Object.assign({}, this._emloyeeService.getEmployee(id))
    }
  }
  saveEmployee(): void {
    const newEmployee: Employee = Object.assign({}, this.employee)
    this._emloyeeService.save(newEmployee)
    this.createEmployeeForm.reset()
    this._router.navigate(['list'])
  }
}
