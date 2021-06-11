import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackOfficeMainComponent } from './back-office-main/back-office-main.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { RestaurantInfoComponent } from './restaurant-info/restaurant-info.component';

const routes: Routes = [
    { path: '', component: BackOfficeMainComponent },
    { path: 'restaurant-info', component: RestaurantInfoComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'orders', component: OrdersComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BackOfficeRoutingModule { }