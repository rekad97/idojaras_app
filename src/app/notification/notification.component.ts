import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';

import {NotifyService} from '../shared/auth_and_register/notify.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  message: any;

  constructor(private notifyService: NotifyService) { }

  ngOnInit(): void {
    this.subscription = this.notifyService.getAlert()
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
  ngOnDestroy() {

    this.subscription.unsubscribe();
  }
}
