import {Injectable} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';
import {Observable, Subject} from 'rxjs';

/**
 * AlertService to help any component to display alert messages on top of the page. (Used by the Alert Component)
 */
@Injectable({providedIn: 'root'})
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterRouteChange = false;

  /**
   * Constructor to clear any alert message unless the keepAfterRouterChange is true.
   * @param router - Router object
   */
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          this.keepAfterRouteChange = false;
        } else {
          this.clear();
        }
      }
    });
  }

  /**
   * Function returns an observable used by the AlertComponent.
   * @return Observable
   */
  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  /**
   * Displays a success alert message with the green background.
   * @param message - Message to be displayed.
   * @param keepAfterRouteChange - If the alert to be shown after a router change. Defaulted to False.
   */

  success(message: string, keepAfterRouteChange = false): void {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next({type: 'success', text: message});
  }

  /**
   * Displays a failure alert message with the red background.
   * @param message - Message to be displayed.
   * @param keepAfterRouteChange - If the alert to be shown after a router change. Defaulted to False.
   */

  error(message: string, keepAfterRouteChange = false): void {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next({type: 'error', text: message});
  }

  /**
   * Clear any alert message if keepRouterChange is false.
   */
  clear(): void {
    this.subject.next();
  }
}
