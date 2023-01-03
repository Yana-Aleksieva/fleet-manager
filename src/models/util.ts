import { RecordId } from "../services/Storage";

export interface Record {
    rentedTo?: any;
    status?: string;
    type?: string;
    rentalPrice?: number;
    id: string
}

export type Rented = string | null;

export type BodyType = 'sedan' | 'suv' | 'hatchback';


export type Transmission = 'manual' | 'automatic';

export type Cargo = 'box' | 'flatbed' | 'van';

export function generateId(): string {
    return '0000-0000'.replace(/0/g, () => (Math.random() * 16 | 0).toString(16));
}

export interface Cars extends Record {

    id: RecordId,
    make: string,
    model: string,
    bodyType: BodyType,
    numberOfSeats: number,
    transmission: Transmission,
    rentalPrice: number

}

export interface Trucks extends Record {

    id: RecordId,
    make: string,
    model: string,
    cargoType: Cargo,
    capacity: number,
    rentalPrice: number
}

export interface Vechicle {
    id: RecordId
    make: string
    model: string
    rentalPrice: number
    rentedTo?: string | null
    bodyTYpe?: string
    numberOfSeats?: number
    transmission?: string
    cargoType?: number
    capacity?: number


}

export function getDetails(vechicle: Vechicle): string[] {

    const arr = [];


    for (let type in vechicle) {

        type = type[0].toUpperCase() + type.substring(1);
        if (type.includes('Seats')) {

        }
        arr.push(updateType(type))
    }

    return arr;
}

function updateType(type: string): string {

    let result: string = '';
    for (let i = 0; i < type.length; i++) {

        if (type[i] == type[i].toUpperCase()) {
            result += ' ';
        }

        result += type[i]
    }

    return result;
}