import { CustomerProduct } from "../customer.product.model";

export class DialogDataCart {
    products: productItem[];
    customerComment: string;
    reservedForDateTime: Date;
    total: number;
    restaurantId: string;
}

export class productItem {
    product: CustomerProduct;
    quantity: number;
}

// todo: Response -> 200 "Restaurant recieved your order"

export class DataCart {
    productsId: string[];
    customerComment: string;
    restaurantComment: string;
    reservedForDateTime: Date;
}
