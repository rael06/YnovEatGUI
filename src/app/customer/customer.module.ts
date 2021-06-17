import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerMainComponent } from './customer-main/customer-main.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    CustomerMainComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MatTabsModule
  ]
})
export class CustomerModule { }
