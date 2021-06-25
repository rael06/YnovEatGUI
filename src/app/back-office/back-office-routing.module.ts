import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackOfficeGuardGuard } from '../core/helpers/back-office-guard.guard';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { RestaurantInfoComponent } from './restaurant-info/restaurant-info.component';

// TODO: Add Guards to routes
const routes: Routes = [
    { path: '', redirectTo: '/restaurant-info', pathMatch: 'full' },
    {
        path: 'restaurant-info',
        component: RestaurantInfoComponent,
        canActivate: [BackOfficeGuardGuard]
    },
    { 
        path: 'products',
        component: ProductsComponent,
        canActivate: [BackOfficeGuardGuard]
     },
    { 
        path: 'orders',
        component: OrdersComponent,
        canActivate: [BackOfficeGuardGuard]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BackOfficeRoutingModule { }