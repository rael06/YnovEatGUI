import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


import { DialogDataSignUp } from 'src/app/core/models/dialogs/dialog-data-sign-up.model';
import { DialogDataLogIn } from 'src/app/core/models/dialogs/dialog-data-log-in.model';

import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ValidationService } from 'src/app/core/services/validation.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { Role } from 'src/app/core/models/role.model';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent implements OnInit {

  // TODO: decouple components
  userDataSignUp = new DialogDataSignUp();
  userDataLogIn = new DialogDataLogIn();

  visibility = 'visible';
  registerRestaurant: boolean;
  userLoggedIn = false;
  userRole: Role;

  constructor(
    public dialog: MatDialog,
    private validationService: ValidationService,
    private snackBar: MatSnackBar,
    private authService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.getAuthenticatedUser();
  }

  openDialogLogIn(): void {

    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '350px',
      height: '260px',
      data: this.userDataLogIn
    });

    this.visibility = 'hidden';

    dialogRef.afterClosed().subscribe(result => {
      this.visibility = 'visible';
      if (result && result[0] == 'register') { // switch to register form
        this.openDialogSignUp();
      } else if (result && result[1] != undefined) { // user login
        this.onLoginSubmit();
      }
    });
  }

  openDialogSignUp(): void {

    const dialogRef = this.dialog.open(RegisterDialogComponent, {
      width: '400px',
      height: '460px',
      data: this.userDataSignUp
    });

    this.visibility = 'hidden';

    dialogRef.afterClosed().subscribe(result => {
      this.visibility = 'visible';
      // TODO: EXTRACT AND PUT ELSEWHERE
      if (result) {
        const success = this.onRegisterSubmit();
        if (!success) {
          this.openDialogSignUp();
        }
      }
    });
  }

  private onLoginSubmit(): void {
    this.authService.authenticateUser(this.userDataLogIn);
  }

  private onRegisterSubmit(): boolean {

    this.userDataSignUp.username = this.userDataSignUp.email;

    if (!this.validationService.validateRegister(this.userDataSignUp)) {
      this.snackBar.open('Please fill in all details', 'Close');
      return false;
    }
    if (!this.validationService.validateEmail(this.userDataSignUp.email)) {
      this.snackBar.open('Please enter valid email', 'Close');
      return false;
    }

    // TODO: refactor! ...?
    this.authService.registerUser(this.userDataSignUp, this.userDataSignUp.registerRestaurant).subscribe({
      next: data => {
        if (data.id) {
          this.snackBar.open('You are now registered and can login', 'Close');
          this.openDialogLogIn();
        }
      },
      error: err => {
        // TODO: better error handling ??
        let errorMsg = err.error.message || err.error.title || "Unknown error"
        this.snackBar.open(errorMsg, 'Close')
        this.openDialogSignUp();
      }
    });
    return true;
  }

  public logOut() {
    this.authService.logout();
    this.snackBar.open('You are now logged out', 'Close')
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
