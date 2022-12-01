import { button, td, tr } from "./dom/dom";
import { Editor } from "./dom/Editor";
import { Table } from "./dom/Table";
import { Car } from "./models/Car";
import { Cars } from "./models/util";
import { CarService } from "./services/CarService";
import { Collections } from "./services/Collection";
import { DataService } from "./services/Service";
import { LocalStorage } from "./services/Storage";

console.log('cars');
const form = document.getElementById('add-form') as HTMLFormElement;
const editForm = document.getElementById('edit-form') as HTMLFormElement;
const table = document.querySelector('table');
const storage = new LocalStorage();
const vechicles = new Collections(storage, 'vehicles');
const carService = new CarService(vechicles);
const tableManager = new Table(table, createTableRow, identifyCar);
const addForm = new Editor(form, onSubmit.bind(null, tableManager), ['make', 'model', 'bodyType', 'numberOfSeats', 'transmission', 'rentalPrice'])
const car = {

    make: 'Opel',
    model: 'A4',
    bodyType: 'sedan',
    numberOfSeats: 4,
    transmission: 'manual',
    rentalPrice: 444

}
hidrate(tableManager)
async function hidrate(tableManager: Table) {
    const cars = await carService.getAll();
    for (let item of cars) {
        tableManager.add(item);
    }
}
async function onStart() {
    //const c = await carService.create(car)
    const cars = await carService.getAll();
    console.log(cars);
}
onStart()


function createTableRow(car: Cars) {
    const row = tr({ carId: car.id },
        td({}, car.id,),
        td({}, car.make),
        td({}, car.model),
        td({}, car.bodyType),
        td({}, car.numberOfSeats.toString()),
        td({}, car.transmission),
        td({}, car.rentalPrice.toString()),
        td({}, button({ className: 'action' }, 'Edit'), button({ className: 'action' }, 'Delete'))
    )

    return row;
}

function identifyCar(cars: Cars[], id: string) {
    return cars.find(e => e.id == id);
}


async function onSubmit(tableManager: Table, { make, model, bodyType, numberOfSeats, transmission, rentalPrice }) {

    const result = await carService.create({
        make,
        model,
        bodyType,
        numberOfSeats,
        transmission,
        rentalPrice
    });

    tableManager.add(result);
}