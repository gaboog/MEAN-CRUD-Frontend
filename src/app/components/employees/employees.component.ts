import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../../services/employee.service";
import {NgForm} from "@angular/forms";
import {Employee} from "../../models/employee";

declare var M: any;

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [EmployeeService]
})
export class EmployeesComponent implements OnInit {

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.getEmployees();
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.employeeService.selectedEmployee = new Employee();
    }
  }

  addEmployee(form: NgForm) {
    if (form.value._id) {
      this.employeeService.putEmployee(form.value)
        .subscribe(res => {
          M.toast({html: 'Employee updated'});
          this.getEmployees();
        })
    } else {
      this.employeeService.postEmployee(form.value)
        .subscribe(res => {
          this.resetForm(form);
          M.toast({html: 'Employee saved'});
          this.getEmployees();
        })
    }
  }

  editEmployee(employee: Employee) {
    this.employeeService.selectedEmployee = employee;
  }

  getEmployees() {
    this.employeeService.getEmployees()
      .subscribe(res => {
        this.employeeService.employees = res as Employee[];
        console.log(res)
      })
  }

  deleteEmployee(_id: string) {
    if(confirm('Are you sure want to delete it?')){
      this.employeeService.deleteEmployee(_id)
        .subscribe(res => {
          M.toast({html: 'Employee Deleted'});
          this.getEmployees();
        })
    }
  }
}

