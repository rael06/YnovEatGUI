import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerMainComponent } from './customer-main/customer-main.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    CustomerMainComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
