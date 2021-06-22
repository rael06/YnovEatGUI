import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { ClosingDate, RestaurantInfo, WeekOpeningTime } from 'src/app/core/models/restaurantInfo';
import { BackOfficeService } from 'src/app/core/services/back-office.service';
import { HttpErrorResponse } from "@angular/common/http";
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-restaurant-info',
  templateUrl: './restaurant-info.component.html',
  styleUrls: ['./restaurant-info.component.css']
})
export class RestaurantInfoComponent implements OnInit {

  restaurantInfo: RestaurantInfo = new RestaurantInfo();
  isRestaurantCreated: boolean = false;
  editForm = false;
  noClosingDatesInFuture: boolean;

  constructor(
    private backOfficeService: BackOfficeService,
    private _sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getRestaurantInfo();
  }

  getRestaurantInfo() {
    this.backOfficeService.getRestaurantInfo()
      .subscribe(
        (data: RestaurantInfo) => {
          this.restaurantInfo = new RestaurantInfo().deserialize(data);
          this.isRestaurantCreated = true;
          this.noClosingDatesInFuture = this.checkIfNoClosingDatesInTheFuture();
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

  notEarlierThanTodayFilter = (date: Date | null): boolean => {
    const today = new Date();
    return date >= today;
  }

  checkIfInPast(d: Date): boolean {
    const date = new Date(d).setHours(0, 0, 0, 0);
    const today = new Date().setHours(0, 0, 0, 0);
    return date < today;
  }

  // Don't display dates in the past
  checkIfNoClosingDatesInTheFuture(): boolean {
    let noDateInFuture = true;
    this.restaurantInfo.closingDates.forEach(
      date => {
        if (new Date(date.closingDateTime) > new Date()) {
          noDateInFuture = false;
        }
      }
    );
    return noDateInFuture;
  }

  // button handlers

  editRestaurantInfo() {
    this.editForm = !this.editForm;
  }

  cancelChanges() {
    this.editForm = !this.editForm;
    this.getRestaurantInfo();
  }

  addClosingDate() {
    // let dateToAdd = new ClosingDate();
    // dateToAdd.closingDateTime = new Date(date);
    this.restaurantInfo.closingDates.push(new ClosingDate());
  }

  deleteClosingDate(index: number) {
    this.restaurantInfo.closingDates.splice(index, 1);
  }

  addWeekOpeningTime() {
    this.restaurantInfo.weekOpeningTimes.push(new WeekOpeningTime());
  }

  deleteWeekOpeningTime(index: number) {
    this.restaurantInfo.weekOpeningTimes.splice(index, 1);
  }

  uploadImg(event: Event, imgType: string) {
    const file = event.target['files'][0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (imgType == 'photo') {
        this.restaurantInfo.base64Image = reader.result.toString();
      } else {
        this.restaurantInfo.base64Logo = reader.result.toString();
      }
    };
  }

  removeImg(imgType: string) {
    if (imgType == 'photo') {
      this.restaurantInfo.base64Image = "";
    } else {
      this.restaurantInfo.base64Logo = "";
    }
  }
}
