import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CustomerProduct } from '../models/customer.product.model';
import { DialogDataCart } from '../models/dialogs/dialog-data-cart.mode';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  // private dialogDataCartSubject: BehaviorSubject<DialogDataCart>;
  // public dialogDataCart: Observable<DialogDataCart>;
  private dialogDataCart: DialogDataCart;
  private cart = new Cart();
  headers: HttpHeaders;

  constructor(
    private _constantsService: ConstantsService,
    private _httpClient: HttpClient
  ) {
    this.dialogDataCart = new DialogDataCart();
    this.headers = new HttpHeaders();
    this.headers.append('Content-type', 'application/json');
    // this.dialogDataCartSubject = new BehaviorSubject<DialogDataCart>(new DialogDataCart());
    // this.dialogDataCart = this.dialogDataCartSubject.asObservable();
  }

  public sendOrder() { // todo: Observable<RestaurantProduct>
    this.cart.customerComment = this.dialogDataCart.customerComment;
    this.cart.reservedForDateTime = this.dialogDataCart.reservedForDateTime;
    this.cart.restaurantId = this.dialogDataCart.restaurantId;
    return this._httpClient
      .post<DialogDataCart>(this._constantsService.createOrder, this.cart, { headers: this.headers });
  }

  public addProductToCart(product: CustomerProduct, quantity: number, restaurantId: string) {
    this.dialogDataCart.products.push({ product, quantity });
    // console.log(restaurantId)
    this.dialogDataCart.restaurantId = restaurantId;
    console.log("order in service: ", this.dialogDataCart)
    this.cart.productsId.push(product.id);
  }

  public getProductToCart(): DialogDataCart {
    return this.dialogDataCart;
  }

}

export class Cart {
  productsId : string[];
  customerComment: string;
  restaurantComment: string;
  reservedForDateTime: Date;
  restaurantId: string;

  constructor() {
    this.productsId = [];
  }
}

