import { Component } from '@angular/core';
import { CustomerRestaurantInfo } from 'src/app/core/models/customer-restaurant-info.model';
import { CustomerService } from 'src/app/core/services/customer.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent {

  restaurants: CustomerRestaurantInfo[] = [];

  constructor(
    private _customerService: CustomerService
  ) {
    this.getAllRestaurantS();
  }

  private getAllRestaurantS() {
    this._customerService.getAllRestaurants().subscribe(
      (data: CustomerRestaurantInfo[]) => {
        this.restaurants = [];
        data.forEach(
          restaurant => this.restaurants.push(new CustomerRestaurantInfo().deserialize(restaurant))      
        );
      }
    )
  }

}
