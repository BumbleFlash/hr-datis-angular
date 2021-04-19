import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../services/employee.service';
import {first} from 'rxjs/operators';
import {AlertService} from '../services/alert.service';
import {Router} from '@angular/router';
import {AuthService} from '../services/authentication.service';

/**
 * Information Component is used to add or update employees. Reuses the design and behaves as per the
 * router path.
 */
@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  submitted = false;
  loading = false;
  updateEmployee: FormGroup;
  title;
  button;
  employee;
  private URL_ADD = '/add';

  /**
   * Sets button and heading texts as per the router path. For ex: the button is set to Add if
   * the path '/add'.
   * @param formBuilder - FormBuilder object.
   * @param employeeService - Employee Service to add or update an employee.
   * @param alertService - Alert Service to display messages.
   * @param router - Router Object.
   * @param authService - Authentication service to include user information.
   */
  constructor(private formBuilder: FormBuilder,
              private employeeService: EmployeeService,
              private alertService: AlertService,
              private router: Router,
              private authService: AuthService) {
    if (this.router.url === this.URL_ADD) {
      this.title = 'Add Employee';
      this.button = 'Add';
    } else {
      this.title = 'Update Employee';
      this.button = 'Update';
    }
  }

  /**
   * Initializes the form with validators. Populates the form with employee information
   * if user chooses to update.
   */
  ngOnInit(): void {
    this.updateEmployee = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      eName: ['', Validators.required],
      base_salary: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      bonus: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      insurance: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      four_o_oneK: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });

    if (this.router.url !== this.URL_ADD) {
      this.employeeService.employeeObservable.subscribe(e => this.employee = e);
      if (!this.employee) {
        this.router.navigate(['/']);
        return;
      }
      this.f.eName.setValue(this.employee.name);
      this.f.email.setValue(this.employee.email);
      this.f.base_salary.setValue(this.employee.base_salary);
      this.f.bonus.setValue(this.employee.bonus);
      this.f.insurance.setValue(this.employee.insurance);
      this.f.four_o_oneK.setValue(this.employee.four_o_oneK);
    }
  }

  /**
   * To shorten the form controls.
   */
  get f(): { [p: string]: AbstractControl } {
    return this.updateEmployee.controls;
  }

  /**
   * Called on Button click. Calls the Add API if the router path was '/add' and the update API if the router path
   * was '/update'
   */
  onSubmit(): void {
    this.submitted = true;

    if (this.updateEmployee.invalid) {
      return;
    }
    const employee = {
      name: this.f.eName.value,
      email: this.f.email.value,
      base_salary: (this.f.base_salary.value) as number,
      bonus: this.f.bonus.value as number,
      insurance: this.f.insurance.value as number,
      four_o_oneK: this.f.four_o_oneK.value as number,
      recruitedBy: {
        username: this.authService.currentUserValue.username,
        email: this.authService.currentUserValue.email
      }
    };

    this.loading = true;
    if (this.router.url === this.URL_ADD) {
      this.employeeService.addEmployee(employee)
        .pipe(first())
        .subscribe(
          res => {
            this.alertService.success(res.message, true);
            this.router.navigate(['/']);
          },
          error => {
            this.loading = false;
            if (error.error.message) {
              this.alertService.error(error.error.message);
            } else {
              this.alertService.error('Sorry error occurred');
            }
          }
        );
    } else {
      this.employeeService.updateEmployee(employee, this.employee._id)
        .pipe(first())
        .subscribe(
          res => {
            this.alertService.success(res.message, true);
            this.router.navigate(['/']);
          },
          error => {
            if (error.error.message) {
              this.alertService.error(error.error.message);
            } else {
              this.alertService.error('Sorry error occurred');
            }
          }
        );
    }
  }


}
