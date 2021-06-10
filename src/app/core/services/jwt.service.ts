import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private helper: JwtHelperService;

  constructor() {
    this.helper = new JwtHelperService();
  }

  public getDecodedToken(token: string) {
    return this.helper.decodeToken(token);
  }

  public getIsExpired(token: string): boolean {
    return this.helper.isTokenExpired(token);
  }
}
