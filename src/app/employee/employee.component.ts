import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../services/employee.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees;

  constructor(private employeeService: EmployeeService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe(
      res => {
        this.employees = res.employees;
      },
      error => {
      }
    );
  }

  update(employee): void {
    this.employeeService.updateEmployeeSubject(employee);
    this.router.navigate(['/update']);
  }

}
