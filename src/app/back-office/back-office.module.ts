import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackOfficeMainComponent } from './back-office-main/back-office-main.component';
import { BackOfficeRoutingModule } from './back-office-routing.module';
import { RestaurantInfoComponent } from './restaurant-info/restaurant-info.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { TabsComponent } from './tabs/tabs.component';

import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BackOfficeMainComponent,
    RestaurantInfoComponent,
    ProductsComponent,
    OrdersComponent,
    TabsComponent,
  ],
  imports: [
    CommonModule,
    BackOfficeRoutingModule,

    MatToolbarModule,
    MatTabsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatListModule,
    
    ReactiveFormsModule,
    FormsModule
  ]
})
export class BackOfficeModule { }
