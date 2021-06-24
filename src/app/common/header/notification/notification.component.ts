import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { OrderService } from 'src/app/core/services/order.service';
// import { BackOfficeService } from "../../../core/services/back-office.service";
// import { Router } from "@angular/router";
// import { OrderService } from "../../../core/services/order.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  public numberOfNotifications: string = "0";
  userLoggedIn = false;
  userRole; // TODO: USE ENUM!

  // https://material.angular.io/components/badge/overview

  constructor(
    private authService: AuthenticationService,
    private orderService: OrderService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getAuthenticatedUser();
    this.orderService.newOrders.subscribe((ordersNumber) => {
      this.numberOfNotifications = ordersNumber;
    });
  }

  private getAuthenticatedUser(): void {
    this.authService.user.subscribe(
      user => {
        this.userLoggedIn = user ? true : false;
        this.userRole = user?.role;
      }
    )
  }

  public goToOrders() {
    this._router.navigate(['/back-office/orders']);
  }

}
