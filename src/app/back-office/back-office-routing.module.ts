import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { RestaurantInfoComponent } from './restaurant-info/restaurant-info.component';

const routes: Routes = [
    { path: '', redirectTo: '/restaurant-info', pathMatch: 'full' },
    { path: 'restaurant-info', component: RestaurantInfoComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'orders', component: OrdersComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BackOfficeRoutingModule { }