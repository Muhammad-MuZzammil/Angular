import { EmployeeService } from './employee.service';
import { Employee } from './../models/employee.model';
import { Department } from './../models/department.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
<<<<<<< HEAD
import { Router } from '@angular/router';
=======
import { Router, ActivatedRoute } from '@angular/router';
>>>>>>> c8dcffd66ece7168d4bd22500fa85f63747c699d

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  @ViewChild('employeeForm') public createEmployeeForm: NgForm
  photoPreview = false
<<<<<<< HEAD
  employee: Employee = {
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
=======
  employee: Employee
  panelTitle: string
>>>>>>> c8dcffd66ece7168d4bd22500fa85f63747c699d
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
<<<<<<< HEAD
    private _router: Router
=======
    private _router: Router,
    private _route: ActivatedRoute
>>>>>>> c8dcffd66ece7168d4bd22500fa85f63747c699d
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
<<<<<<< HEAD
  }
  saveEmployee(): void {
    this._emloyeeService.save(this.employee)
    this._router.navigate(['list'])
=======
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
      this._emloyeeService.getEmployee(id)
        .subscribe((employee) => {
          this.employee = employee
        },
          (error: any) => console.log(error))
      this.panelTitle = 'Edit Employee'
    }
  }
  saveEmployee(): void {
    if (this.employee.id === null) {
      this._emloyeeService.addEmployee(this.employee).subscribe((data: Employee) => {
        console.log(data)
        this.createEmployeeForm.reset()
        this._router.navigate(['list'])
      },
        (error: any) => console.log(error))
    }
    else {
      this._emloyeeService.updateEmployee(this.employee)
        .subscribe(() => {
          this.createEmployeeForm.reset()
          this._router.navigate(['list'])
        },
          (err: any) => {
            console.log(err)
          })
    }
>>>>>>> c8dcffd66ece7168d4bd22500fa85f63747c699d
  }
}
