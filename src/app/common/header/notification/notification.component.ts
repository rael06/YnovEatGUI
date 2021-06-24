import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  userLoggedIn = false;
  userRole; // TODO: USE ENUM!

  // https://material.angular.io/components/badge/overview

  constructor(
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.getAuthenticatedUser();
  }

  private getAuthenticatedUser(): void {
    this.authService.user.subscribe(
      user => {
        this.userLoggedIn = user ? true : false;
        this.userRole = user?.role;
      }
    )
  }

}
