import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import DataJson from '../../../assets/product.json';


@Component({
  selector: 'app-customer-main',
  templateUrl: './customer-main.component.html',
  styleUrls: ['./customer-main.component.css']
})
export class CustomerMainComponent implements OnInit {
  restaurantId: string;
  productList;

  //public produtList:{id:number, title:string, price:string, img:string, description:string, tag:string}[] = DataJson;

  constructor(private _activatedRoute: ActivatedRoute) {
    // TODO: OUT; https://www.tektutorialshub.com/angular/angular-passing-parameters-to-route/
    // Snapshot vs observable...
    // this.restaurantId = this._activatedRoute.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(params => {
      this.restaurantId = params.get('id');
      this.productList = DataJson.filter(t=>t.idRestaurant === this.restaurantId)
    });


  }

}
