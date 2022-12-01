import { RecordId } from "../services/Storage";
import { BodyType, Record, Rented, Transmission } from "./util";
import { Vechicle } from "./Vechicle";

export class Car extends Vechicle {

    bodyType: BodyType
    numberOfSeats: number
    transmission: Transmission

    constructor(
        id: string,
        make: string,
        model: string,

        bodyType: BodyType,
        numberOfSeats: number,
        transmission: Transmission,
        rentalPrice: number,
        rentedTo?: string

    ) {
        super();
        this.id = id,
            this.make = make,
            this.model = model,
            this.bodyType = bodyType,
            this.numberOfSeats = numberOfSeats,
            this.transmission = transmission,
            this.rentalPrice = rentalPrice
        this.rentedTo === undefined ? null : this.rentedTo = rentedTo





    }
}




// For `Car`:
// - `bodyType`: one of **sedan**, **suv** or **hatchback**
// - `numberOfSeats`: number
// - `transmission`: one of **manual** or **automatic**
