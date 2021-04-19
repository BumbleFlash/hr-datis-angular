import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../services/authentication.service';
import {first} from 'rxjs/operators';
import {AlertService} from '../services/alert.service';

/**
 * Component responsible for maintaining the login form.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;

  /**
   * Navigates to the main page if the user is already logged in.
   * @param formBuilder - FormBuilder object
   * @param router - Router instance.
   * @param authService - Authentication service to login user.
   * @param alertService - Alert Service to display messages.
   */
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private alertService: AlertService) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  /**
   * Initializes the form with validators.
   */
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  /**
   * To shorten the form controls.
   */
  get f(): { [p: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  /**
   * Called on Button click. Calls the login function in the Authentication Service.
   */
  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate(['/']);
        },
        error => {
          this.alertService.error(error.error.message);
          this.loading = false;
        }
      );
  }

}
