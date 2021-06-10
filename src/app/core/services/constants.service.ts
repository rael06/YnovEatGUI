import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  
  baseUrl = "http://89.38.150.41:91";

  loginUrl = this.baseUrl + "/api/Authentication/login"

}
