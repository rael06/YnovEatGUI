import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RestaurantInfo } from '../models/restaurantInfo';
import { RestaurantProduct } from '../models/restaurantProduct.model';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root'
})
export class BackOfficeService {

  private restaurantIdSubject: BehaviorSubject<string>;
  public restaurantId: Observable<string>;

  constructor(
    private _constantsService: ConstantsService,
    private _httpClient: HttpClient
  ) {
    const localStorageRestaurantId = JSON.parse(localStorage.getItem('restaurantId'));
    this.restaurantIdSubject = new BehaviorSubject<string>(localStorageRestaurantId)
    this.restaurantId = this.restaurantIdSubject.asObservable();
    if (!localStorageRestaurantId) {
      this.getRestaurantInfo().subscribe(
        data => {
          if (data.id) {
            localStorage.setItem('restaurantId', JSON.stringify(data.id));
            this.restaurantIdSubject.next(data.id);
          }
        }
      )
    } 
  }

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
      .patch<RestaurantInfo>(this._constantsService.updateRestaurantInfo, { payload }, { headers });
  }

  getAllRestaurantProducts(restaurantId: string): Observable<RestaurantProduct[]> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    const url = `${this._constantsService.getRestaurantProducts}${restaurantId}`
    return this._httpClient
      .get<RestaurantProduct[]>(url, { headers });
  }
  
}
