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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';

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
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    // { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
  ],
})
export class BackOfficeModule { }
