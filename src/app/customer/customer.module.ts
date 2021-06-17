import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerMainComponent } from './customer-main/customer-main.component';
import { CustomerRoutingModule } from './customer-routing.module';

import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

import { CartComponent } from './cart/cart.component';
import { CardComponent } from './card/card.component';


@NgModule({
  declarations: [
    CustomerMainComponent,
    CartComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MatTabsModule,
    MatCardModule,
    MatChipsModule
  ]
})
export class CustomerModule { }
