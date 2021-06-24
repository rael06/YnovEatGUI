import { CustomerProduct } from "../customer.product.model";

export class DialogDataCart {
    products: productItem[];
    customerComment: string;
    reservedForDateTime: Date;
    total: number;
    restaurantId: string;

    constructor() {
        this.products = [];
    }
}

export class productItem {
    product: CustomerProduct;
    quantity: number;
}
