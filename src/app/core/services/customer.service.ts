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

  private headers: HttpHeaders;

  constructor(
    private _constantsService: ConstantsService,
    private _httpClient: HttpClient
  ) {
    this.headers = new HttpHeaders();
    this.headers.append('Content-type', 'application/json');
  }

  getAllRestaurants(): Observable<CustomerRestaurantInfo[]> {
    const url = `${this._constantsService.getAllRestaurants}`
    return this._httpClient
      .get<CustomerRestaurantInfo[]>(url, { headers: this.headers });
  }

  getRestaurantProducts(restaurantId: string): Observable<CustomerProduct[]> {
    const url = `${this._constantsService.getRestaurantProducts}/${restaurantId}`;
    return this._httpClient
      .get<CustomerProduct[]>(url, { headers: this.headers });
  }

  
}
