import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {AuthService} from '../services/authentication.service';

/**
 * AuthGuard helper is used for preventing any unauthorized users by simply checking if the token is available.
 * Implements CanActivate, an Interface that a class can implement to be a guard deciding if a route can be activated.
 */
@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  /**
   * The canActivate function checks if the user is available or not. Redirects to login page on false.
   * @param route - Contains the information about a route associated with a component loaded in an outlet at a particular moment in time
   * @param state - Represents the state of the router at a moment in time
   * @return boolean if the user has permission or not.
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
