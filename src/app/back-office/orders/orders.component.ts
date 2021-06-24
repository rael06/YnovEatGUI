import { Component, OnInit } from '@angular/core';
import { BackOfficeService } from "../../core/services/back-office.service";
import { RestaurantProduct } from "../../core/models/restaurant-product.model";
import { OrderService } from "../../core/services/order.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

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
      console.log(payload);
      this.backOfficeService.addStatusToOrders(payload).subscribe(() => {
        this.orderService.resetNewOrders()
      });
    });
  }

}
