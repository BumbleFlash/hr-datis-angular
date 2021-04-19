import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../services/authentication.service';
import {first} from 'rxjs/operators';
import {AlertService} from '../services/alert.service';

/**
 * Component responsible for maintaining the registration form.
 */
@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  /**
   * Navigates to the main page if the user is already logged in.
   * @param formBuilder - FormBuilder object
   * @param router - Router instance.
   * @param authService - Authentication service to register user.
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
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  /**
   * To shorten the form controls.
   */
  get f(): { [p: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  /**
   * Called on Button click. Calls the register function in the Authentication Service.
   */
  onSubmit(): void {
    this.submitted = true;

    // check if the form is invalid.
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.register(this.f.username.value, this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        res => {
          this.alertService.success(res.message, true);
          this.router.navigate(['/login']);
        },
        () => {
          this.loading = false;
          this.alertService.error('Email already taken');
        }
      );
  }


}
