import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { ValidationService } from 'src/app/core/services/validation.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent implements OnInit {

  username: string;

  firstName: string;
  lastName: string;
  email: string;
  phone: string

  password: string;

  visibility = 'visible';

  loginData: string[];
  signUpData: number[];

  constructor(
    private _router: Router,
    public dialog: MatDialog,
    private _authService: AuthenticationService,
    private _validationService: ValidationService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  openDialogLogIn(): void {

    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '350px',
      height: '260px',
      data: { username: this.username, password: this.password }
    });

    this.visibility = 'hidden';

    dialogRef.afterClosed().subscribe(result => {
      this.loginData = result;
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
      width: '350px',
      height: '450px',
      data: {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        phone: this.phone
      }
    });

    this.visibility = 'hidden';

    dialogRef.afterClosed().subscribe(result => {
      this.signUpData = result;
      this.visibility = 'visible';
      if (result) {
        const success = this.onRegisterSubmit();
        if (!success) {
          this.openDialogSignUp();
        }
      }
    });
  }

  public onLoginSubmit(): void {

    const username = this.loginData[0];
    const password = this.loginData[1];

    this._authService.authenticateUser(username, password);
  }

  onRegisterSubmit(): boolean {

    const user = {
      firstname: this.signUpData[0],
      lastname: this.signUpData[1],
      email: this.signUpData[2],
      username: this.signUpData[2],
      password: this.signUpData[3],

    };

    if (!this._validationService.validateRegister(user)) {
      this._snackBar.open('Please fill in all details', 'Close');
      return false;
    }
    if (!this._validationService.validateEmail(user.email)) {
      this._snackBar.open('Please enter valid email', 'Close');
      return false;
    }
    this._authService.registerUser(user).subscribe({
      next: data => {
        if (data.id) {
          console.log(data)
          this._snackBar.open('You are now registered and can login', 'Close');
          this.openDialogLogIn();
        }
      },
      error: err => {
        console.log(err);
        let errorMsg = err.error.message || err.error.title || "Unknown error"
        this._snackBar.open(errorMsg, 'Close')
        this.openDialogSignUp();
      }
    });
    return true;
  }

}
