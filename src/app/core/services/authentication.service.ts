import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthResponse } from '../models/auth-response.model';
import { DialogDataLogIn } from '../models/dialogs/dialog-data-log-in.model';
import { DialogDataSignUp } from '../models/dialogs/dialog-data-sign-up.model';
import { RegisterResponse } from '../models/register-response.model';
import { Role } from '../models/role.model';
import { User } from '../models/user.model';
import { ConstantsService } from './constants.service';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // TODO: repeat header thing in other services (bo, customery)
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  headers: HttpHeaders;

  constructor(
    private _router: Router,
    private _httpClient: HttpClient,
    private _constantsService: ConstantsService,
    private _jwtService: JwtService,
    private _snackBar: MatSnackBar,
  ) {
    this.headers = new HttpHeaders();
    this.headers.append('Content-type', 'application/json');
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public authenticateUser(userData: DialogDataLogIn) {
    this._httpClient.post<AuthResponse>(this._constantsService.loginUrl, userData, { headers: this.headers })
      .subscribe({
        next: data => {
          if (data.token) {
            this.storeUserData(data.token);
            this._snackBar.open('You are now logged in', 'Close');
            if (this.userValue.role === 'RestaurantAdmin') {
              this._router.navigate(['/back-office/restaurant-info']);
            }
          }
        },
        error: err => {
          this._snackBar.open(err.statusText, 'Close');
        }
      });
  }

  public registerUser(userData: DialogDataSignUp, registerRestaurant: boolean) {
    const url = registerRestaurant ? this._constantsService.registerRestaurantAdmin : this._constantsService.registerCustomer
    return this._httpClient.post<RegisterResponse>(url, userData, { headers: this.headers })
      .pipe();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  public isUserRestaurantOwner(): boolean {
    return this.userSubject.value.role == Role.RestaurantAdmin;
  }

  private storeUserData(token: string) {
    const userToken = this._jwtService.getDecodedToken(token);

    const user = new User();
    user.username = userToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
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
