import { Component, OnInit } from '@angular/core';
import { RestaurantProduct } from 'src/app/core/models/restaurantProduct.model';
import { BackOfficeService } from 'src/app/core/services/back-office.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  restaurantId: string
  restaurantProducts: RestaurantProduct[] = [];

  constructor(
    private backOfficeService: BackOfficeService
  ) {
    this.backOfficeService.restaurantId.subscribe(
      (restaurantId) => {
        if (restaurantId) {
          this.restaurantId = restaurantId;
          this.getAllRestaurantProducts()
        }
      }
      
    )
  }

  ngOnInit(): void {
    
  }

  private getAllRestaurantProducts() {
    this.backOfficeService.getAllRestaurantProducts(this.restaurantId).subscribe(
      (data: RestaurantProduct[]) => {
        data.forEach(
          product => this.restaurantProducts.push(new RestaurantProduct().deserialize(product))
        )
        console.log("products: ", this.restaurantProducts);
      }
    )
  }

}
