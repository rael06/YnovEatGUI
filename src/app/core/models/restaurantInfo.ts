import { Deserializable } from "./deserializable.model";

export class RestaurantInfo implements Deserializable {
    id: string;

    name: string;
    phoneNumber: string;
    email: string;
    zipCode: string;
    country: string;
    city: string;
    streetNumber: string;
    streetName: string;
    addressExtraInformation: string;

    ownerId: string;

    base64Image: string;
    base64Logo: string;

    isOpen: boolean;
    isPublished: boolean;
    
    closingDates: ClosingDate[];
    weekOpeningTimes: WeekOpeningTime[];
    // TODO: We don't have categories anymore (for now)
    restaurantCategories: RestaurantCategory[];
    // TODO: Employees => seperated route, not a part of form
    restaurantUsers: [
        {
            userId: string,
            type: string
        }
    ]

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}

export class ClosingDate implements Deserializable {
    id: string;
    closingDateTime: string;
    restaurantId: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}

export class WeekOpeningTime implements Deserializable {
    id: string;
    dayOfWeek: number;
    restaurantId: string;
    openingTimes: OpeningTime[];

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}

export class OpeningTime implements Deserializable {
    id: string;
    startTimeInMinutes: number;
    endTimeInMinutes: number;
    startOrderTimeInMinutes: number;
    endOrderTimeInMinutes: number;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}

export class RestaurantCategory implements Deserializable {
    id: string;
    name: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
