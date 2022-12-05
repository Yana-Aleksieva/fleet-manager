import { BodyType, Cargo, Transmission } from "./util";
import { Vechicle } from "./Vechicle";



export class Vechicles extends Vechicle {

    type: 'car' | 'truck'
    status: 'Available' | 'Rented'
    details: HTMLLIElement

    constructor(
        id: string,
        type: 'car' | 'truck',
        make: string,
        model: string,
        rentalPrice: number,
        status: 'Available' | 'Rented',
        details: HTMLLIElement

    ) {
        super();
        this.id = id,

            this.model = model,
            this.make = make,
            this.type = type,

            this.status = status,
            this.rentalPrice = rentalPrice,
            this.details = details
         

    }
}