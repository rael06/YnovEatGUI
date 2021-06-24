import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDataCart } from 'src/app/core/models/dialogs/dialog-data-cart.mode';

@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.css']
})
export class CartDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CartDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogDataCart
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
