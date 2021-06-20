import { Deserializable } from "./deserializable.model";

export class RestaurantProduct implements Deserializable {

    id: string;
    name: string;
    description: string;
    price: number;
    isActive: boolean;
    creationDateTime: string; // TODO: change to Date
    expirationDateTime: string;
    restaurantId: string;
    productFamily: number

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
