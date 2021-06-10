import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: string;
  password: string;

  visibility = 'visible';

  loginData: number[];

  constructor(
    private _authService: AuthenticationService,
    private _router: Router,
    public dialog: MatDialog,
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
      if (result) {
        this.onLoginSubmit();
      }
    });
  }


  onLoginSubmit() {

    const user = {
      username: this.loginData[0],
      password: this.loginData[1],
    };

    this._authService.authenticateUser(user).subscribe({
      next: data => {
        if (data.token) {
          // TODO: ??? this.authService.storeUserData(data.token, user);
          console.log(data.token)
          // this.snackBar.open('You are now logged in', 'Close');
          this._router.navigate(['/intro']).then();
        }
      },
      error: err => {
        // this.errorMessageService.displayError(err)
        // this.openDialogLogIn();
        console.log(err)
      }
    });
  }

}
