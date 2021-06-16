import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  
  baseUrl = "http://89.38.150.41:91";

  loginUrl = this.baseUrl + "/api/Authentication/login"

  registerSuperAdmin = this.baseUrl + "/api/Authentication/init-super-admin/SA-YE-pass-00"

  registerCustomer = this.baseUrl + "/api/Authentication/register-customer"

  registerRestaurantAdmin = this.baseUrl + "/api/Authentication/register-restaurantAdmin"

}
