import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RestaurantInfo } from '../models/restaurant-info.model';
import { RestaurantProduct } from '../models/restaurant-product.model';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root'
})
export class BackOfficeService {

  constructor(
    private _constantsService: ConstantsService,
    private _httpClient: HttpClient
  ) { }

  getRestaurantInfo(): Observable<RestaurantInfo> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this._httpClient
      .get<RestaurantInfo>(this._constantsService.getRestaurantInfo, { headers });
  }

  patchRestaurantInfo(payload: RestaurantInfo): Observable<RestaurantInfo> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this._httpClient
      .patch<RestaurantInfo>(this._constantsService.updateRestaurantInfo, payload, { headers });
  }

  createRestaurant(payload: RestaurantInfo): Observable<RestaurantInfo> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this._httpClient
      .post<RestaurantInfo>(this._constantsService.createRestaurant, payload, { headers });
  }

  getAllRestaurantProducts(): Observable<RestaurantProduct[]> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this._httpClient
      .get<RestaurantProduct[]>(this._constantsService.getAllRestaurantProducts, { headers });
  }

  addRestaurantProduct(payload: RestaurantProduct): Observable<RestaurantProduct> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this._httpClient
      .post<RestaurantProduct>(this._constantsService.restaurantProduct, payload, { headers });
  }

  deleteRestaurantProduct(productId: string): Observable<RestaurantProduct> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    const url = `${this._constantsService.restaurantProduct}/${productId}`
    return this._httpClient
      .delete<RestaurantProduct>(url, { headers });
  }

  updateRestaurantProduct(product: RestaurantProduct): Observable<RestaurantProduct> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this._httpClient
      .patch<RestaurantProduct>(this._constantsService.restaurantProduct, product, { headers });
  }

}
