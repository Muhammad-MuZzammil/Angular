import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../models/employee.model';
import { debug } from 'util';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit {
  @Input() employee: Employee
  constructor() { }

  ngOnInit() {
  }
}
