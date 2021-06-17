import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './common/header/header.component';

import { MatInputModule } from '@angular/material/input'
// import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'
import { IntroComponent } from './common/intro/intro.component';
import { LoginDialogComponent } from './common/authentication/login-dialog/login-dialog.component';
import { RegisterDialogComponent } from './common/authentication/register-dialog/register-dialog.component';
import { ConnectComponent } from './common/authentication/connect/connect.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox'

import { JwtInterceptor } from './core/helpers/jwt.interceptor';


import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CardComponent } from './customer/card/card.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MainContentComponent } from './customer/main-content/main-content.component';
import { MatChipsModule } from '@angular/material/chips';
import { DialogProductComponent } from './customer/dialog-product/dialog-product.component';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    HeaderComponent,
    LoginDialogComponent,
    RegisterDialogComponent,
    ConnectComponent,
    CardComponent,
    MainContentComponent,
    DialogProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    // MatFormFieldModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    // MatFormFieldModule,
    MatSnackBarModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,

    MatChipsModule,

    MatChipsModule,
    MatCheckboxModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
