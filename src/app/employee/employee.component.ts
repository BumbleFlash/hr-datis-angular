import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../services/employee.service';
import {Router} from '@angular/router';

/**
 * Employee Component is used to populate all the employees.
 */
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees;
  loading = true;

  constructor(private employeeService: EmployeeService,
              private router: Router) {
  }

  /**
   * populates the employees array after making a get request.
   */
  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe(
      res => {
        this.employees = res.employees;
        this.loading = false;
      },
      error => {
      }
    );
  }

  /**
   * Called upon click of the Update button. Populates the employee behavior subject and
   * navigates to the '/update' page
   * @param employee - employee object
   */
  update(employee): void {
    this.employeeService.updateEmployeeSubject(employee);
    this.router.navigate(['/update']);
  }

}
