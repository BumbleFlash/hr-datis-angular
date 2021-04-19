import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {User} from './model';
import {AuthService} from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
/**
 * Parent component. Stores the current user from the AuthService to show/hide the navigation bar.
 */
export class AppComponent {
  currentUser: User;

  /**
   * Stores the current user from the AuthService to show/hide the navigation bar.
   * @param router - Router object
   * @param authService - Authentication Service
   */
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  /**
   * The function is called on LogOut button click.
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
