import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DialogDataCart } from '../models/dialogs/dialog-data-cart.mode';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  headers: HttpHeaders;

  constructor(
    private _constantsService: ConstantsService,
    private _httpClient: HttpClient
  ) {
    this.headers = new HttpHeaders();
    this.headers.append('Content-type', 'application/json');
  }

  public sendOrder(order: DialogDataCart) { // todo: Observable<RestaurantProduct>
    return this._httpClient
      .post<DialogDataCart>(this._constantsService.createOrder, order, { headers: this.headers });
  }

}
