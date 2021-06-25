import { Deserializable } from "./deserializable.model";

export class RestaurantOrder implements Deserializable {

    id: string;
    customerComment: string;
    restaurantComment: string;
    reservedForDateTime: Date;
    isAccepted: boolean;
    customerId: string;
    currentOrderStatus: currentOrderStatus; 
    isAcknowledged: boolean;
    customerProducts: customerProduct[];
    totalPrice: number;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}

export class currentOrderStatus implements Deserializable {

    status: number;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}

export class customerProduct implements Deserializable {

    name: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}

