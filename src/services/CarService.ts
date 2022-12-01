import { Car } from "../models/Car";
import { Cars, Record } from "../models/util";
import { DataService } from "./Service";


export class CarService extends DataService<Car>{
    protected parseRecord(record: Cars): Car {
        
        const data = record;
        const result = new Car(
         data.id,
            data.make,
            data.model,
            data.bodyType,
            data.numberOfSeats,
            data.transmission,
            data.rentalPrice



        )
        return result;
    }
    protected validate(data: any): void {
        // if (typeof data.bodyType != 'string') {
        //     throw new TypeError('Incompatible record. Invalid property "body');
        // }
        // if (typeof data.numbersOfSeats != 'number') {
        //     throw new TypeError('Incompatible record. Invalid property "seats"');
        // }
        // if (typeof data.rentalPrice != 'number') {
        //     throw new TypeError('Incompatible record. Invalid property "rent"');
        // }
    }



}