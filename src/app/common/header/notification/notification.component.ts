import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/core/models/role.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { BackOfficeService } from 'src/app/core/services/back-office.service';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  public numberOfNotifications: string = "0";
  userLoggedIn = false;
  userRole: Role;

  constructor(
    private authService: AuthenticationService,
    private orderService: OrderService,
    private backOfficeService: BackOfficeService,
    private router: Router
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
    this.backOfficeService.getAllRestaurantOrders().subscribe();
    this.router.navigate(['/back-office/orders']);
  }

}
