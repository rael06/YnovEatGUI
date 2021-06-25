import { Component, OnInit } from '@angular/core';
import { BackOfficeService } from "../../core/services/back-office.service";
import { RestaurantProduct } from "../../core/models/restaurant-product.model";
import { OrderService } from "../../core/services/order.service";
import { RestaurantOrder } from 'src/app/core/models/restaurant-order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  restaurantOrders: RestaurantOrder[] = [];
  statues = [true, true, false, false, false, false, false, false]

  constructor(
    private backOfficeService: BackOfficeService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.backOfficeService.getNewOrders().subscribe((data: RestaurantProduct[]) => {
      const payload = {
        "ordersId": data,
        "state": 1
      }
      this.backOfficeService.addStatusToOrders(payload).subscribe(() => {
        this.orderService.resetNewOrders()
      });
      this.getAllRestaurantOrders();
    });
  }

  private getAllRestaurantOrders() {
    this.backOfficeService.getAllRestaurantOrders().subscribe(
      (data: RestaurantOrder[]) => {
        this.restaurantOrders = [];
        data.forEach(
          order => {
            this.restaurantOrders.push(new RestaurantOrder().deserialize(order));
          }
        )
      }
    )
  }

  displayNew() {
    this.statues = [true, true, false, false, false, false, false, false];
  }

  dispayInPreparation() {
    this.statues = [false, false, true, false, false, false, false, false];
  }

  displayReady() {
    this.statues = [false, false, false, true, false, false, false, false];
  }

  displayDelivered() {
    this.statues = [false, false, false, false, true, false, false, false];
  }

  displayOther() {
    this.statues = [false, false, false, false, false, true, true, true];
  }

  processOrder(id: string, status: number) {
    this.backOfficeService.addStatusToOrders(
      { 
        ordersId: [id],
        state: status + 1
      }
      ).subscribe(() => this.getAllRestaurantOrders());
  }

}
