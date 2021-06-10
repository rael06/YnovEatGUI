import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthResponse } from '../models/authResponse';
import { User } from '../models/user';
import { ConstantsService } from './constants.service';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  loginUrl: string;
  registerUserUrl: string;
  registerRestaurantAdminUrl: string;

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private _router: Router,
    private _httpClient: HttpClient,
    private _constantsService: ConstantsService,
    private _jwtService: JwtService,
    private _snackBar: MatSnackBar
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  public authenticateUser(username: string, password: string) {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    this.loginUrl = this._constantsService.loginUrl;
    this._httpClient.post<AuthResponse>(this.loginUrl, { username, password}, { headers })
      .subscribe({
        next: data => {
          if (data.token) {
            this.storeUserData(data.token);
            this._snackBar.open('You are now logged in', 'Close');
            // TODO: Navigate if role: restaurant
            this._router.navigate(['/intro']).then();
          }
        },
        error: err => {
          this._snackBar.open(err.statusText, 'Close');
          // this.openDialogLogIn();
          console.log(err)
        }
      });
  }

  public registerUser(user) {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    this.registerUserUrl = this._constantsService.loginUrl;
    return this._httpClient.post<AuthResponse>(this.registerUserUrl, user, { headers })
      .pipe();
  }

  private storeUserData(token: string) {
    const userToken = this._jwtService.getDecodedToken(token);
    console.log(userToken)

    const user = new User();
    user.username = userToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    user.role = userToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    user.token = token;

    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }





}
