import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { RestaurantInfo } from 'src/app/core/models/restaurantInfo';
import { BackOfficeService } from 'src/app/core/services/back-office.service';

@Component({
  selector: 'app-restaurant-info',
  templateUrl: './restaurant-info.component.html',
  styleUrls: ['./restaurant-info.component.css']
})
export class RestaurantInfoComponent implements OnInit {

  restaurantInfo: RestaurantInfo;
  imageBase64;

  constructor(
    private backOfficeService: BackOfficeService,
    private _sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.backOfficeService.getRestaurantInfo()
      .subscribe(
        (data: RestaurantInfo) => {
          this.restaurantInfo = new RestaurantInfo().deserialize(data)
          // this.restaurantInfo = data;
          console.log("info: ", this.restaurantInfo)
          this.imageBase64 = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
            + this.restaurantInfo.base64Image);
        }
      )
  }

}
