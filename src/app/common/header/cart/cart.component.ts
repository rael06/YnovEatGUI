import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogDataCart } from 'src/app/core/models/dialogs/dialog-data-cart.mode';
import { Role } from 'src/app/core/models/role.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { OrderService } from 'src/app/core/services/order.service';
import { CartDialogComponent } from './cart-dialog/cart-dialog.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  userLoggedIn = false;
  userRole: Role;

  userDataCart: DialogDataCart;

  constructor(
    private authService: AuthenticationService,
    private orderService: OrderService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAuthenticatedUser();
    // this.getDialogDataCart();
  }

  private getAuthenticatedUser(): void {
    this.authService.user.subscribe(
      user => {
        this.userLoggedIn = user ? true : false;
        this.userRole = user?.role;
      }
    )
  }

  onCartClick() {
    this.userDataCart = this.orderService.getProductToCart()
    this.openDialogCart();
    console.log("cart in cart: ", this.userDataCart)
  }

  openDialogCart(): void {
    const dialogRef = this.dialog.open(CartDialogComponent, {
      width: '400px',
      height: '460px',
      data: this.userDataCart
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("result: ", result);
      this.orderService.sendOrder().subscribe( data => {
        if(data['id']) {
          // TODO: SNACK
          this.orderService.resetCart();
        }
      }
      );
    });

    
  }

}
