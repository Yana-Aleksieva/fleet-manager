import { Truck } from "../models/Truck";
import { Cargo, Record, Trucks } from "../models/util";
import { DataService } from "./Service";


export class TruckService extends DataService<Truck>  {
   
    protected parseRecord(record: Trucks): Truck {
        const data = record;
        const result = new Truck(
            data.id,
            data.make,
            data.model,
            data.cargoType,
            data.capacity,
            data.rentalPrice,



        )
        return result;
    }
    protected validate(data: any): void {
        throw new Error("Method not implemented.");
    }

}