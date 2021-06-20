import { Component, OnInit } from '@angular/core';
import { RestaurantProduct } from 'src/app/core/models/restaurantProduct.model';
import { BackOfficeService } from 'src/app/core/services/back-office.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  restaurantId: string
  restaurantProducts: RestaurantProduct[] = [];
  editForm = false;
  editFormArray: boolean[] = [];
  addingNewProduct = false
  newProduct: RestaurantProduct = new RestaurantProduct();

  constructor(
    private backOfficeService: BackOfficeService
  ) {
    // TODO: FIX RESTAUANT ID ERROR... (NOT WORKING AFTER LOGOUT / LOGIN AGAIN)
    this.backOfficeService.restaurantId.subscribe(
      (restaurantId) => {
        if (restaurantId) {
          this.restaurantId = restaurantId;
          this.getAllRestaurantProducts()
        }
      }
      
    )
  }

  ngOnInit(): void {
    
  }

  private getAllRestaurantProducts() {
    this.backOfficeService.getAllRestaurantProducts(this.restaurantId).subscribe(
      (data: RestaurantProduct[]) => {
        this.restaurantProducts = [];
        data.forEach(
          (product, index) => {
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
    // this.restaurantInfo.weekOpeningTimes.splice(index, 1);
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
