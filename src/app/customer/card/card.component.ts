import { Component, OnInit, Input } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { DialogProductComponent } from '../dialog-product/dialog-product.component';


export interface Tag
{
  name: string;
}

export interface DialogData
{
  title: string
  description: string
  image: string
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() title: string;
  @Input() price: string;
  @Input() description: string;
  @Input() tags: string;
  @Input() image: string;

  //title = "Plat";
  //description = "Pari in in usus aquae iuris in provinciae his Hierosolymis speciem Hierosolymis flumen Hierosolymis verum calentes Pompeius aquae delata domitis iuris delata nusquam emergunt delata quoque aquae verum in formavit."
  //image= "https://images.pexels.com/photos/2116094/pexels-photo-2116094.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"

  /*tags: Tag[] = [
    {name: 'bio'},
    {name: 'salade'}
  ];*/

  /*drop(event: CdkDragDrop<Tag[]>) {
    moveItemInArray(this.tags, event.previousIndex, event.currentIndex);
  }*/

  constructor(public dialog: MatDialog)
  {

  }

  onClick(): void
  {
    const dialogRef = this.dialog.open(DialogProductComponent, {
      //width: '560px',
      data: {title: this.title, description: this.description, image: this.image, price: this.price}
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }

  ngOnInit()
  {

  }

  getTitre()
  {
    return this.title;
  }

}
