import { Cargo } from "./util";
import { Vechicle } from "./Vechicle";



export class Truck extends Vechicle {
  
cargoType: Cargo
capacity: number


    constructor(
        id: string,
        make: string,
        model: string,
        cargoType: Cargo,
        capacity: number,
        rentalPrice: number
    ) {
        super();
        this.id = id,
        this.make = make,
        this.model = model,
        this.cargoType = cargoType,
        this.capacity = capacity,
        this.rentalPrice = rentalPrice

    }
}

//  For `Truck`:
//  - `cargoType`: one of **box**, **flatbed** or **van**
//  - `capacity`: number
