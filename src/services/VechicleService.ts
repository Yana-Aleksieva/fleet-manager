import { Car } from "../models/Car";
import { Truck } from "../models/Truck";
import { Vechicle } from "../models/Vechicle";
import { Vechicles } from "../models/Vechicles";
import { DataService } from "./Service";



export class VechicleService extends DataService<Vechicles>{
    
    protected parseRecord(record): Vechicles {

        const data = record;
        const result = new Vechicles(
            data.id,
            data.type,
            data.model,
            data.make,
            data.rentalPrice,
            data.status,
            data.details,




        )
        return result;
    }
    protected validate(data: any): void {
        if (typeof data.bodyType != 'string') {
            throw new TypeError('Incompatible record. Invalid property "body');
        }
        if (typeof data.numbersOfSeats != 'number') {
            throw new TypeError('Incompatible record. Invalid property "seats"');
        }
        if (typeof data.rentalPrice != 'number') {
            throw new TypeError('Incompatible record. Invalid property "rent"');
        }
    }




}