import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerMainComponent } from './customer-main/customer-main.component';
import { CustomerRoutingModule } from './customer-routing.module';

import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    CustomerMainComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MatTabsModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
  ]
})
export class CustomerModule { }
