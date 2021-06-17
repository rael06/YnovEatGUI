import { Component, OnInit } from '@angular/core';
import { RestaurantInfo } from 'src/app/core/models/restaurantInfo';
import { BackOfficeService } from 'src/app/core/services/back-office.service';

@Component({
  selector: 'app-restaurant-info',
  templateUrl: './restaurant-info.component.html',
  styleUrls: ['./restaurant-info.component.css']
})
export class RestaurantInfoComponent implements OnInit {

  restaurantInfo: RestaurantInfo;

  constructor(
    private backOfficeService: BackOfficeService
  ) { }

  ngOnInit(): void {
    this.backOfficeService.getRestaurantInfo()
      .subscribe(
        (data: RestaurantInfo) => {
          this.restaurantInfo = new RestaurantInfo().deserialize(data)
          // this.restaurantInfo = data;
          console.log("info: ", this.restaurantInfo)
        }
      )
  }

}
