import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackOfficeMainComponent } from './back-office-main/back-office-main.component';
import { BackOfficeRoutingModule } from './back-office-routing.module';
import { RestaurantInfoComponent } from './restaurant-info/restaurant-info.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { TabsComponent } from './tabs/tabs.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';

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
  ]
})
export class BackOfficeModule { }
