import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackOfficeMainComponent } from './back-office-main/back-office-main.component';

const routes: Routes = [
    { path: '', component: BackOfficeMainComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BackOfficeRoutingModule { }