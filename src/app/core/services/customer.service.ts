import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerRestaurantInfo } from '../models/customer-restaurant-info.model';
import { CustomerProduct } from '../models/customer.product.model';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private _constantsService: ConstantsService,
    private _httpClient: HttpClient
  ) { }

  // TODO: MOVE TO CUSTOMER SERVICE, SAME FOR RESTAURANT AND OTHERS

  getAllRestaurants(): Observable<CustomerRestaurantInfo[]> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    const url = `${this._constantsService.getAllRestaurants}`
    return this._httpClient
      .get<CustomerRestaurantInfo[]>(url, { headers });
  }

  getRestaurantProducts(restaurantId: string): Observable<CustomerProduct[]> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    const url = `${this._constantsService.getRestaurantProducts}/${restaurantId}`;
    return this._httpClient
      .get<CustomerProduct[]>(url, { headers });
  }

  
}
