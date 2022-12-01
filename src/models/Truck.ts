import { Cargo } from "./util";
import { Vechicle } from "./Vechicle";



export class Truck extends Vechicle {

    constructor(

        cargoType: Cargo,
        capacity: number
    ) {
        super();
    }
}

//  For `Truck`:
//  - `cargoType`: one of **box**, **flatbed** or **van**
//  - `capacity`: number
