import { Component, OnInit } from '@angular/core';
import { RestaurantProduct } from 'src/app/core/models/restaurantProduct.model';
import { BackOfficeService } from 'src/app/core/services/back-office.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  restaurantProducts: RestaurantProduct[] = [];
  editForm = false;
  editFormArray: boolean[] = [];
  addingNewProduct = false
  newProduct: RestaurantProduct = new RestaurantProduct();

  constructor(
    private backOfficeService: BackOfficeService
  ) {
    this.getAllRestaurantProducts();
  }

  private getAllRestaurantProducts() {
    this.backOfficeService.getAllRestaurantProducts().subscribe(
      (data: RestaurantProduct[]) => {
        this.restaurantProducts = [];
        data.forEach(
          product => {
            this.restaurantProducts.push(new RestaurantProduct().deserialize(product));
            this.editFormArray.push(false)
          }
        )
        if (this.restaurantProducts.length == 0) {
          this.addingNewProduct = true;
        }
        console.log("products: ", this.restaurantProducts);
      }
    )
  }

  openAddNewProduct() {
    this.addingNewProduct = true;
  }

  openUpdateProduct(index: number) {
    this.editFormArray[index] = true;
  }

  addProduct() {
    console.log(this.newProduct)
    this.backOfficeService.addRestaurantProduct(this.newProduct).subscribe(
      () => {
        this.addingNewProduct = false;
        this.getAllRestaurantProducts()
      }
    );
  }

  deleteProduct(productId: string) {
    this.backOfficeService.deleteRestaurantProduct(productId).subscribe(
      data => {
        console.log(data);
        this.getAllRestaurantProducts();
      }
    )
  }

  updateProduct(product: RestaurantProduct, index: number) {
    this.backOfficeService.updateRestaurantProduct(product).subscribe(
      data => {
        console.log(data)
        this.getAllRestaurantProducts();
        this.editFormArray[index] = false; 
      }
    )
  }

}
