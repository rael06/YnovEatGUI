import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { FormGroup, FormBuilder, Validators, FormControl, FormArray, NgForm } from '@angular/forms';

import { OpeningTime, RestaurantInfo, WeekOpeningTime } from 'src/app/core/models/restaurantInfo';
import { BackOfficeService } from 'src/app/core/services/back-office.service';

@Component({
  selector: 'app-restaurant-info',
  templateUrl: './restaurant-info.component.html',
  styleUrls: ['./restaurant-info.component.css']
})
export class RestaurantInfoComponent implements OnInit {

  restaurantForm: any;

  restaurantInfo: RestaurantInfo = new RestaurantInfo();

  editForm = false;

  

  constructor(
    private backOfficeService: BackOfficeService,
    private _sanitizer: DomSanitizer,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.restaurantForm = new FormGroup({
      weekOpeningTimes: new FormArray([])
    })

    this.backOfficeService.getRestaurantInfo()
      .subscribe(
        (data: RestaurantInfo) => {
          this.restaurantInfo = new RestaurantInfo().deserialize(data);
          console.log("info: ", this.restaurantInfo);
          // this.imageBase64 = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
          //   + this.restaurantInfo.base64Image);

          // this.restaurantForm.patchValue(this.restaurantInfo);
          // this.restaurantForm.disable();
          console.log(this.restaurantInfo?.weekOpeningTimes[0].openingTimes[0].startTimeInMinutes)

          for (let x in this.restaurantInfo.weekOpeningTimes) {
            console.log("x: ", this.restaurantInfo.weekOpeningTimes[x].id)
            
            this.restaurantForm.get('weekOpeningTimes').push(new FormGroup({
              id: new FormControl(this.restaurantInfo.weekOpeningTimes[x].id),
              dayOfWeek: new FormControl(this.restaurantInfo.weekOpeningTimes[x].dayOfWeek, [Validators.required]),
              restaurantId: new FormControl(this.restaurantInfo.weekOpeningTimes[x].restaurantId),
              openingTimes: new FormGroup({
                startTimeInMinutes: new FormControl(this.restaurantInfo.weekOpeningTimes[x].openingTimes[0].startTimeInMinutes),
                endTimeInMinutes: new FormControl(this.restaurantInfo.weekOpeningTimes[x].openingTimes[0].endTimeInMinutes)
              })
            }))

            // if (data.weekOpeningTimes[x].openingTimes != []) {
            //   this.restaurantForm.get(`openingTimes${x}`).push(new FormGroup({
            //     startTimeInMinutes: new FormControl(data.weekOpeningTimes[x].openingTimes[0].startTimeInMinutes, [Validators.required]),
            //     endTimeInMinutes: new FormControl(data.weekOpeningTimes[x].openingTimes[0].endTimeInMinutes, [Validators.required])
            //   }))
            // }
          }

          this.restaurantForm.disable();
        }
      );

  }

  onSubmit() {
    console.log(this.restaurantForm)
  }

  submit() {
    console.log(this.restaurantForm)
  }

  add() {
    this.restaurantForm.get('weekOpeningTimes').push(new FormGroup({
      dayOfWeek: new FormControl("", [Validators.required])
    }))
  }

  deleteItem(i: number) {
    this.restaurantForm.get('weekOpeningTimes').removeAt(i);
  }

  track(item: any, index: number) {
    return index;
  }

  track2(item: any, index: number) {
    return index;
  }


  editRestaurantInfo() {
    this.restaurantForm.enable();
    this.editForm = true;
  }

  // submitForm() {
  //   if (!this.restaurantForm.valid) {
  //     return;
  //   }
  //   console.log(this.restaurantForm.value);
  // }

}
