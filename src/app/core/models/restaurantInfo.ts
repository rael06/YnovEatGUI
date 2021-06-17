import { Deserializable } from "./deserializable.model";

export class RestaurantInfo implements Deserializable {
    id: string;
    name: string;
    phoneNumber: string;
    email: string;

    base64Image: string;
    base64Logo: string;
    isOpen: true;
    isPublished: false;
    zipCode: string;
    country: string;
    city: string;
    streetNumber: string;
    streetName: string;
    addressExtraInformation: string;
    closingDates: [
        {
            closingDateTime: Date
        }
    ];
    weekOpeningTimes: [
        {
            dayOfWeek: number,
            openingTimes: [
                {
                    startTimeInMinutes: number,
                    endTimeInMinutes: number,
                    startOrderTimeInMinutes: number,
                    endOrderTimeInMinutes: number
                }
            ]
        }
    ];
    restaurantCategories: [
        {
            name: string
        }
    ];
    restaurantUsers: [
        {
            userId: string,
            type: string
        }
    ]

    deserialize(input: any) {
        console.log("deserializator")
        Object.assign(this, input);
        return this;
    }
}
