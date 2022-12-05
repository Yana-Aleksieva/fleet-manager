import { Record } from "../models/util";
import { Collections } from "./Collection";


export interface Service <T> {

    
    getAll(): Promise<T[]>;
    getById(id: string): Promise<T>;
    create(data): Promise<T>;
    update(id: any, data: any): Promise<T>
    delete(id: string): Promise<void>
    
}


export abstract class DataService<T> implements Service<T>{

    constructor(
        private collection: Collections
    ) { }
    async getAll(): Promise<T[]> {
        const records = (await this.collection.getAll()).map(r => this.parseRecord(r));
        
        return records;
    }
    async getById(id: string): Promise<T> {
        const record = await this.collection.getById(id);
        return this.parseRecord(record);
    }
    async create(data: any): Promise<T> {
       // this.validate(data);
        const record = await this.collection.create(data);
        return this.parseRecord(record);
    }
    async update(id: any, data: any): Promise<T> {
        //this.validate(data);
        const record = await this.collection.update(id, data);
        return this.parseRecord(record);
    }
      async delete(id: string): Promise<void> {
        return this.collection.delete(id);
    }

    async filter(criteria: string){
     const result =    (await this.collection.getAll()).filter(obj => obj.hasOwnProperty(criteria));
    
     return result
    }
    protected abstract parseRecord(record: Record): T
    protected abstract validate(data: any): void
}
