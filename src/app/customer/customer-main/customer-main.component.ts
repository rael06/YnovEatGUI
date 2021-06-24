import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerProduct } from 'src/app/core/models/customer.product.model';
import { CustomerService } from 'src/app/core/services/customer.service';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-customer-main',
  templateUrl: './customer-main.component.html',
  styleUrls: ['./customer-main.component.css']
})
export class CustomerMainComponent implements OnInit {

  // TODO: Design...
  cathegoriesPresence = [
    { name: "Starter", index: 0, present: false},
    { name: "Main", index: 1, present: false},
    { name: "Dessert", index: 2, present: false},
    { name: "Drink", index: 3, present: false},
    { name: "Menu", index: 4, present: false},
    { name: "Sandwich", index: 5, present: false},
    { name: "Daily", index: 6, present: false},
    { name: "Other", index: 7, present: false}
  ]
  
  restaurantId: string;
  productList: CustomerProduct[] = [];
  // selectedProducts: CustomerProduct[];
  index = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private orderService: OrderService
  ) {
    // TODO: OUT; https://www.tektutorialshub.com/angular/angular-passing-parameters-to-route/
    // Snapshot vs observable...
    // this.restaurantId = this._activatedRoute.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.restaurantId = params.get('id');
      this.customerService.getRestaurantProducts(params.get('id')).subscribe(
        (data: CustomerProduct[]) => {
          data.forEach(product => {
            this.productList.push(new CustomerProduct().deserialize(product));
            this.cathegoriesPresence.forEach(
              cathegory => {
                if (cathegory.index == product.productFamily) {
                  cathegory.present = true;
                }
              }
            )
          }
        )}
      );
    });
  }

  setIndex(index: number) {
    this.index = index;
  }

  getIndex($event) {
    console.log($event.index)
    this.index = $event.index
    // TODO: OUT! (CHECK FIRST)
    // this.selectedProducts = this.productList.filter(product => product.productFamily == this.index);
  }

  addProductToCart(product: CustomerProduct) {
    // console.log(product)
    this.orderService.addProductToCart(product, 1, this.restaurantId);
  }

}
