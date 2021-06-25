import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RestaurantInfo } from '../models/restaurant-info.model';
import { RestaurantOrder } from '../models/restaurant-order.model';
import { RestaurantProduct } from '../models/restaurant-product.model';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root'
})
export class BackOfficeService {

  private headers: HttpHeaders;

  constructor(
    private _constantsService: ConstantsService,
    private _httpClient: HttpClient
  ) {
    this.headers = new HttpHeaders();
    this.headers.append('Content-type', 'application/json');
  }

  getRestaurantInfo(): Observable<RestaurantInfo> {
    return this._httpClient
      .get<RestaurantInfo>(this._constantsService.getRestaurantInfo, { headers: this.headers });
  }

  patchRestaurantInfo(payload: RestaurantInfo): Observable<RestaurantInfo> {
    return this._httpClient
      .patch<RestaurantInfo>(this._constantsService.updateRestaurantInfo, payload, { headers: this.headers });
  }

  createRestaurant(payload: RestaurantInfo): Observable<RestaurantInfo> {
    return this._httpClient
      .post<RestaurantInfo>(this._constantsService.createRestaurant, payload, { headers: this.headers });
  }

  getAllRestaurantProducts(): Observable<RestaurantProduct[]> {
    return this._httpClient
      .get<RestaurantProduct[]>(this._constantsService.getAllRestaurantProducts, { headers: this.headers });
  }

  addRestaurantProduct(payload: RestaurantProduct): Observable<RestaurantProduct> {
    return this._httpClient
      .post<RestaurantProduct>(this._constantsService.restaurantProduct, payload, { headers: this.headers });
  }

  deleteRestaurantProduct(productId: string): Observable<RestaurantProduct> {
    const url = `${this._constantsService.restaurantProduct}/${productId}`
    return this._httpClient
      .delete<RestaurantProduct>(url, { headers: this.headers });
  }

  updateRestaurantProduct(product: RestaurantProduct): Observable<RestaurantProduct> {
    return this._httpClient
      .patch<RestaurantProduct>(this._constantsService.restaurantProduct, product, { headers: this.headers });
  }

  getAllRestaurantOrders(): Observable<RestaurantOrder[]> {
    return this._httpClient
      .get<RestaurantOrder[]>(this._constantsService.getRestaurantOrders, { headers: this.headers });
  }

  getNewOrders(): Observable<RestaurantProduct[]> {
    return this._httpClient
      .get<RestaurantProduct[]>(this._constantsService.getNewOrdersNotification, { headers: this.headers });
  }

  addStatusToOrders(payload): Observable<{}> {
    return this._httpClient
      .post<{}>(this._constantsService.addStatusToOrders, payload, { headers: this.headers });
  }

}
