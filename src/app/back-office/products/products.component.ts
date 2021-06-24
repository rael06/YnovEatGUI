import { Component, OnInit } from '@angular/core';
import { RestaurantProduct } from 'src/app/core/models/restaurant-product.model';
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

  toggleAddNewProduct() {
    this.addingNewProduct = !this.addingNewProduct;
  }

  openUpdateProduct(index: number) {
    this.editFormArray[index] = true;
  }

  addProduct() {
    console.log(this.newProduct)
    this.backOfficeService.addRestaurantProduct(this.newProduct).subscribe(
      () => {
        this.newProduct = new RestaurantProduct();
        this.addingNewProduct = false;
        this.getAllRestaurantProducts()
      }
    );
  }

  // TODO: DIALOG FOR DELETE CONFIRMATION
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

  uploadImg(event: Event, product: RestaurantProduct) {
    const file = event.target['files'][0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => product.image = reader.result.toString();
  }

  removeImg(product: RestaurantProduct) {
    product.image = "";
  }

}
