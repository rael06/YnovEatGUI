import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerMainComponent } from './customer-main/customer-main.component';

const routes: Routes = [
    { path: 'restaurant/:id', component: CustomerMainComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerRoutingModule { }