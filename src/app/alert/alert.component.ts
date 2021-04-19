import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

import {AlertService} from '../services/alert.service';

/**
 * The AlertComponent populates the division with the respective type and message by subscribing to the
 * AlertService's observable.
 */
@Component({selector: 'app-alert', templateUrl: 'alert.component.html'})
export class AlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  message: any;

  constructor(private alertService: AlertService) {
  }

  ngOnInit(): void {
    /**
     * Gets alert from the observable and displays message with provided type.
     */
    this.subscription = this.alertService.getAlert()
      .subscribe(message => {
        switch (message && message.type) {
          case 'success':
            message.cssClass = 'alert alert-success';
            break;
          case 'error':
            message.cssClass = 'alert alert-danger';
            break;
        }

        this.message = message;
      });
  }

  /**
   * Unsubscribe from the service to avoid leaks.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
