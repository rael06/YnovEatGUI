import { Injectable } from '@angular/core';
import { DialogDataSignUp } from '../models/dialogs/dialog-data-sign-up.model';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  validateRegister(user: DialogDataSignUp): boolean {
    console.log(user)
    if (user.username === undefined || user.email === undefined || user.password === undefined) {
      return false;
    }
    else {
      return true;
    }
  }

  validateEmail(email: string): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}
