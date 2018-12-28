<<<<<<< HEAD
=======
import { EmployeeListResolverService } from './employees/employee-list-resolver.service';
>>>>>>> c8dcffd66ece7168d4bd22500fa85f63747c699d
import { CreateEmployeeCanDeactivateGuardService } from './employees/create-employee-can-deactivate-guard.service';
import { DisplayEmployeeComponent } from './employees/display-employee.component';
import { EmployeeService } from './employees/employee.service';
import { ConfirmEqualValidatorDirective } from './shared/confirm-equal-validator.directive';
import { SelectRequiredValidatorDirective } from './shared/select-validator-required.directive';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
<<<<<<< HEAD
=======
import { HttpClientModule } from '@angular/common/http';
>>>>>>> c8dcffd66ece7168d4bd22500fa85f63747c699d


import { AppComponent } from './app.component';
import { ListEmployeesComponent } from './employees/list-employees.component';
import { CreateEmployeeComponent } from './employees/create-employee.component';
<<<<<<< HEAD

const appRoutes: Routes = [
  { path: 'list', component: ListEmployeesComponent },
  {
    path: 'create',
    component: CreateEmployeeComponent,
    canDeactivate: [CreateEmployeeCanDeactivateGuardService]
  },
=======
import { EmployeeDetailsComponent } from './employees/employee-details.component';
import { EmployeeFilterPipe } from './employees/employee-filter.pipe';
import { PageNotFoundComponent } from './page-not-found.component';
import { EmployeeDetailsGuardService } from './employees/employee-details-guard.service';
import { AccordionComponent } from './shared/accordion.component';

const appRoutes: Routes = [
  {
    path: 'list',
    component: ListEmployeesComponent,
    resolve: { employeeList: EmployeeListResolverService }
  },
  {
    path: 'edit/:id',
    component: CreateEmployeeComponent,
    canDeactivate: [CreateEmployeeCanDeactivateGuardService]
  },
  { 
    path: 'employees/:id',
     component: EmployeeDetailsComponent,
     canActivate:[EmployeeDetailsGuardService]
     },
  { path: 'notfound', component: PageNotFoundComponent },
>>>>>>> c8dcffd66ece7168d4bd22500fa85f63747c699d
  { path: '', redirectTo: '/list', pathMatch: 'full' },
]


@NgModule({
  declarations: [
    AppComponent,
    ListEmployeesComponent,
    CreateEmployeeComponent,
    SelectRequiredValidatorDirective,
    ConfirmEqualValidatorDirective,
<<<<<<< HEAD
    DisplayEmployeeComponent

=======
    DisplayEmployeeComponent,
    EmployeeDetailsComponent,
    EmployeeFilterPipe,
    PageNotFoundComponent,
    AccordionComponent,
    
>>>>>>> c8dcffd66ece7168d4bd22500fa85f63747c699d
  ],
  imports: [
    BrowserModule,
    FormsModule,
<<<<<<< HEAD
=======
    HttpClientModule,
>>>>>>> c8dcffd66ece7168d4bd22500fa85f63747c699d
    BsDatepickerModule.forRoot(),
    RouterModule.forRoot(appRoutes),

  ],
<<<<<<< HEAD
  providers: [EmployeeService, CreateEmployeeCanDeactivateGuardService],
=======
  providers: [EmployeeService, CreateEmployeeCanDeactivateGuardService, EmployeeListResolverService,EmployeeDetailsGuardService],
>>>>>>> c8dcffd66ece7168d4bd22500fa85f63747c699d
  bootstrap: [AppComponent]
})
export class AppModule { }
