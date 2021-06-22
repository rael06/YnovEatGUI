import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardComponent } from '../card/card.component';

export interface DialogData
{
  title: string
  description: string
  image: string
  price: string
}

@Component({
  selector: 'app-dialog-product',
  templateUrl: './dialog-product.component.html',
  styleUrls: ['./dialog-product.component.css']
})
export class DialogProductComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CardComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
