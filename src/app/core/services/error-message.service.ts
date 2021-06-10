import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  constructor(private _snackBar: MatSnackBar) { }

  displayError(error) {
    const errorList = error.error.errors;
    let errorMsg = '';
    errorList.forEach(errorRsp => {
      errorMsg += errorRsp.msg + '. ';
    });
    this._snackBar.open(errorMsg, 'Close');
  }
}
