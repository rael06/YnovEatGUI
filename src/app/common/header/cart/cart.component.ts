import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogDataCart } from 'src/app/core/models/dialogs/dialog-data-cart.mode';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { CartDialogComponent } from './cart-dialog/cart-dialog.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  userLoggedIn = false;
  userRole; // TODO: USE ENUM!

  userDataCart = new DialogDataCart();

  constructor(
    private authService: AuthenticationService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAuthenticatedUser();
  }

  private getAuthenticatedUser(): void {
    this.authService.user.subscribe(
      user => {
        this.userLoggedIn = user ? true : false;
        this.userRole = user?.role;
      }
    )
  }

  openDialogCart(): void {
    const dialogRef = this.dialog.open(CartDialogComponent, {
      width: '400px',
      height: '460px',
      data: this.userDataCart
    });

    dialogRef.afterClosed().subscribe(result => {
      // TODO: FINISH!
      // ...
      // this.
      // if (result) {
      //   const success = this.onRegisterSubmit();
      //   if (!success) {
      //     this.openDialogSignUp();
      //   }
      // }
    });
  }

}
