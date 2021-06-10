import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../models/AuthResponse';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authToken: any;
  user: any;
  url: string;

  constructor(
    private httpClient: HttpClient,
    private _constantsService: ConstantsService,
  ) {
    this.url = this._constantsService.loginUrl;
  }

  authenticateUser(user) {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.httpClient.post<AuthResponse>(this.url, user, { headers })
      .pipe();
  }

}
