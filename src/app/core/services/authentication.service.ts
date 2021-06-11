import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthResponse } from '../models/authResponse';
import { RegisterResponse } from '../models/registerResponse';
import { User } from '../models/user';
import { ConstantsService } from './constants.service';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

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
    this._httpClient.post<AuthResponse>(this._constantsService.loginUrl, { username, password}, { headers })
      .subscribe({
        next: data => {
          if (data.token) {
            this.storeUserData(data.token);
            this._snackBar.open('You are now logged in', 'Close');
            // TODO: Navigate if role: restaurant
            if (this.userValue.role === 'SuperAdmin') {
              this._router.navigate(['/back-office']).then();
            }
          }
        },
        error: err => {
          this._snackBar.open(err.statusText, 'Close');
          console.log(err)
        }
      });
  }

  public registerUser(user) {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    // this.registerUserUrl = this._constantsService.loginUrl;
    return this._httpClient.post<RegisterResponse>(this._constantsService.registerSuperAdmin, user, { headers })
      .pipe();
  }

  private storeUserData(token: string) {
    const userToken = this._jwtService.getDecodedToken(token);
    console.log(userToken)

    const user = new User();
    user.username = userToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    // TODO: use enum
    user.role = userToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    user.token = token;

    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }





}
