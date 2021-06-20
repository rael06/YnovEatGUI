import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestaurantInfo } from '../models/restaurantInfo';
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

}
