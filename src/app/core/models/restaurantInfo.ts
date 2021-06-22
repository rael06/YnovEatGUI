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

    isOpen: boolean; // TODO: What is that?
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
    closingDateTime: Date;

    // TODO: OUT?
    constructor() {
        this.closingDateTime = new Date();
    }

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

    constructor() {
      this.dayOfWeek=0;
      this.restaurantId='';
      this.openingTimes = new Array<OpeningTime>();
      this.openingTimes.push(new OpeningTime())
    }

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
