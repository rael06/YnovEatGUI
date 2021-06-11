import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackOfficeMainComponent } from './back-office-main/back-office-main.component';
import { BackOfficeRoutingModule } from './back-office-routing.module';
import { RestaurantInfoComponent } from './restaurant-info/restaurant-info.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
  declarations: [
    BackOfficeMainComponent,
    RestaurantInfoComponent,
    ProductsComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    BackOfficeRoutingModule
  ]
})
export class BackOfficeModule { }
