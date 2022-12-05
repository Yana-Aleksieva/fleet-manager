import { RecordId } from "../services/Storage";
import { Record, Rented, Trucks } from "./util";



export abstract class Vechicle{
    id: RecordId
    make: string
    model: string
    rentalPrice: number
    rentedTo?: string | null
}
// Create abstract model `Vehicle` with properties:
// - `id`: string
// - `make`: string
// - `model`: string
// - `rentalPrice`: number
// - `rentedTo`: string or null