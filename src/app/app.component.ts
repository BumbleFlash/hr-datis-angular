import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {User} from './model';
import {AuthService} from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}