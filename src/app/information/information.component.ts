import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../services/employee.service';
import {first} from 'rxjs/operators';
import {AlertService} from '../services/alert.service';
import {Router} from '@angular/router';
import {AuthService} from '../services/authentication.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  submitted = false;
  loading = false;
  updateEmployee: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private employeeService: EmployeeService,
              private alertService: AlertService,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.updateEmployee = this.formBuilder.group({
      email: ['', Validators.required],
      eName: ['', Validators.required],
      base_salary: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      bonus: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      insurance: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      four_o_oneK: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  get f(): { [p: string]: AbstractControl } {
    return this.updateEmployee.controls;
  }

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
  }


}
