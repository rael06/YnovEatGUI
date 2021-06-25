import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CustomerProduct } from '../models/customer.product.model';
import { DialogDataCart } from '../models/dialogs/dialog-data-cart.mode';
import { Role } from '../models/role.model';
import { AuthenticationService } from './authentication.service';
import { BackOfficeService } from './back-office.service';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root'
})
// TODO: Split into Customer / Back office service
export class OrderService {

  private headers: HttpHeaders;

  private cart: DialogDataCart; // cart
  private order: Order; // order

  private newOrdersSubject: BehaviorSubject<string>;
  public newOrders: Observable<string>;

  userRole: Role;

  constructor(
    private constantsService: ConstantsService,
    private httpClient: HttpClient,
    private backOfficeService: BackOfficeService,
    private authService: AuthenticationService
  ) {
    this.cart = new DialogDataCart();
    this.order = new Order();

    this.headers = new HttpHeaders();
    this.headers.append('Content-type', 'application/json');
    
    this.newOrdersSubject = new BehaviorSubject<string>("0");
    this.newOrders = this.newOrdersSubject.asObservable();
    
    this.getAuthenticatedUser();
    
  }

  public sendOrder() { // TODO: Observable<RestaurantProduct>
    this.order.customerComment = this.cart.customerComment;
    this.order.reservedForDateTime = this.cart.reservedForDateTime;
    this.order.restaurantId = this.cart.restaurantId;
    return this.httpClient
      .post<DialogDataCart>(this.constantsService.createOrder, this.order, { headers: this.headers });
  }

  private getNewOrders() {
    this.backOfficeService.getNewOrders().subscribe((data: []) => {
      this.newOrdersSubject.next(data.length.toString());
    });
  }

  public addProductToCart(product: CustomerProduct, quantity: number, restaurantId: string) {
    this.cart.products.push({ product, quantity });
    this.cart.restaurantId = restaurantId;
    this.order.productsId.push(product.id);
  }

  public getProductToCart(): DialogDataCart {
    return this.cart;
  }

  private setGetOrdersInterval() {
    setInterval(() => {
      this.getNewOrders();
    }, 30000);
  }

  public resetNewOrders() {
    this.backOfficeService.getNewOrders().subscribe((data: []) => {
      this.newOrdersSubject.next("0");
    });
  }

  public resetCart() {
    this.cart = new DialogDataCart();
    this.order = new Order();
  }

  private getAuthenticatedUser(): void {
    this.authService.user.subscribe(
      user => {
        this.userRole = user?.role;
        if (this.userRole == Role.RestaurantAdmin) { 
          this.getNewOrdersNotification();
        }
      }
    )
  }

  private getNewOrdersNotification() {
    this.getNewOrders();
    this.setGetOrdersInterval()
  }

}

export class Order {
  productsId : string[];
  customerComment: string;
  restaurantComment: string;
  reservedForDateTime: Date;
  restaurantId: string;

  constructor() {
    this.productsId = [];
  }
}

