import { Cargo } from "./util";
import { Vechicle } from "./Vechicle";



export class Truck extends Vechicle {
type: 'truck'  
cargoType: Cargo
capacity: number
status: string

    constructor(
        id: string,
        make: string,
        model: string,
        cargoType: Cargo,
        capacity: number,
        rentalPrice: number,
        rentedTo?: null|string

    ) {
        super();
        this.id = id,
        this.make = make,
        this.model = model,
        this.cargoType = cargoType,
        this.capacity = capacity,
        this.rentalPrice = rentalPrice,
        this.rentedTo === undefined ? null : this.rentedTo = rentedTo,
        this.type = 'truck',
        this.status = 'Available'

    }
}

//  For `Truck`:
//  - `cargoType`: one of **box**, **flatbed** or **van**
//  - `capacity`: number
