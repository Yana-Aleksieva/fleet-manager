import { RecordId } from "../services/Storage";

export interface Record {
    id: string
}

export type Rented = string | null;

export type BodyType = 'sedan' | 'suv' | 'hatchback';


export type Transmission = 'manual' | 'automatic';

export type Cargo = 'box' | 'flatbed' | 'van';

export function generateId(): string {
    return '0000-0000'.replace(/0/g, () => (Math.random() * 16 | 0).toString(16));
}

export interface Cars extends Record{

    id: RecordId,
    make: string,
    model: string,
    bodyType: BodyType,
    numberOfSeats: number,
    transmission: Transmission,
    rentalPrice: number

}

export interface Trucks extends Record{

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
    bodyTYpe? : string
    numberOfSeats?: number
    transmission? : string
    cargoType?: number
    capacity?: number
    

}