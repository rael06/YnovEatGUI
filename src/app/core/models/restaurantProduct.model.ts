import { Deserializable } from "./deserializable.model";

export class RestaurantProduct implements Deserializable {

    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    isActive: boolean;
    expirationDateTime: Date;
    restaurantId: string;
    productFamily: number

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
