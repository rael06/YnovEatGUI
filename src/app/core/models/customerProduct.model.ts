import { Deserializable } from "./deserializable.model";

export class CustomerProduct implements Deserializable {

    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    isActive: boolean;
    expirationDateTime: string;
    restaurantId: string;
    productFamily: number

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
