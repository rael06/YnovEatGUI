import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerProduct } from 'src/app/core/models/customerProduct.model';
import { CustomerService } from 'src/app/core/services/customer.service';

@Component({
  selector: 'app-customer-main',
  templateUrl: './customer-main.component.html',
  styleUrls: ['./customer-main.component.css']
})
export class CustomerMainComponent implements OnInit {
  
  restaurantId: string;
  productList: CustomerProduct[];
  selectedProducts: CustomerProduct[];

  //public produtList:{id:number, title:string, price:string, img:string, description:string, tag:string}[] = DataJson;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _customerService: CustomerService
  ) {
    // TODO: OUT; https://www.tektutorialshub.com/angular/angular-passing-parameters-to-route/
    // Snapshot vs observable...
    // this.restaurantId = this._activatedRoute.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(params => {
      this.restaurantId = params.get('id');
      this._customerService.getRestaurantProducts().subscribe(
        (data: CustomerProduct[]) => {
          data.forEach(product => this.productList.push(new CustomerProduct().deserialize(product)));
        }
      )
    });


  }

}
