import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthResponse } from '../models/authResponse';
import { RegisterResponse } from '../models/registerResponse';
import { Role } from '../models/role';
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
            if (this.userValue.role === 'RestaurantAdmin') {
              this._router.navigate(['/back-office']);
            }
          }
        },
        error: err => {
          this._snackBar.open(err.statusText, 'Close');
        }
      });
  }

  public registerUser(user, registerRestaurant: boolean) {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    // this.registerUserUrl = this._constantsService.loginUrl;
    const url = registerRestaurant ? this._constantsService.registerRestaurantAdmin : this._constantsService.registerCustomer
    return this._httpClient.post<RegisterResponse>(url, user, { headers })
      .pipe();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  public get UserRole(): Role {
    return this.userSubject.value.role;
  }

  private storeUserData(token: string) {
    const userToken = this._jwtService.getDecodedToken(token);

    const user = new User();
    user.username = userToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    // TODO: use enum
    user.role = userToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    user.token = token;

    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this._router.navigate(['/']);
  }

}
