import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackOfficeMainComponent } from './back-office-main/back-office-main.component';
import { BackOfficeRoutingModule } from './back-office-routing.module';

@NgModule({
  declarations: [
    BackOfficeMainComponent
  ],
  imports: [
    CommonModule,
    BackOfficeRoutingModule
  ]
})
export class BackOfficeModule { }
