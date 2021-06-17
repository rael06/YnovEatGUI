import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerMainComponent } from './customer-main/customer-main.component';
import { CustomerRoutingModule } from './customer-routing.module';

import { MatTabsModule } from '@angular/material/tabs';

import { CartComponent } from './cart/cart.component';


@NgModule({
  declarations: [
    CustomerMainComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MatTabsModule
  ]
})
export class CustomerModule { }
