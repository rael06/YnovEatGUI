import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { RestaurantInfo, WeekOpeningTime } from 'src/app/core/models/restaurantInfo';
import { BackOfficeService } from 'src/app/core/services/back-office.service';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-restaurant-info',
  templateUrl: './restaurant-info.component.html',
  styleUrls: ['./restaurant-info.component.css']
})
export class RestaurantInfoComponent implements OnInit {

  restaurantInfo: RestaurantInfo = new RestaurantInfo();

  isRestaurantCreated: boolean = false;

  editForm = false;

  constructor(
    private backOfficeService: BackOfficeService,
    private _sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getRestaurantInfo();
  }

  deleteItem(index: number) {
    this.restaurantInfo.weekOpeningTimes.splice(index, 1);
  }

  editRestaurantInfo() {
    this.editForm = !this.editForm;
  }

  getRestaurantInfo() {
    this.backOfficeService.getRestaurantInfo()
      .subscribe(
        (data: RestaurantInfo) => {
          this.restaurantInfo = new RestaurantInfo().deserialize(data);
          console.log("info: ", this.restaurantInfo);
          this.isRestaurantCreated = true;
        },
        (error: HttpErrorResponse) => {
          if (error.status === 404) {
            console.log("Restaurant is not created")
          }
        },
      );
  }

  updateRestaurantInfo() {
    this.backOfficeService.patchRestaurantInfo(this.restaurantInfo).subscribe(data => {
      this.editForm = false;
      this.getRestaurantInfo();
    });
  }

  createRestaurant() {
    this.backOfficeService.createRestaurant(this.restaurantInfo).subscribe(data => {
      this.editForm = false;
      this.getRestaurantInfo();
    });
  }

  handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.restaurantInfo.base64Image = reader.result.toString();
    };
  }

  add() {
    this.restaurantInfo.weekOpeningTimes.push(new WeekOpeningTime());
  }
}
