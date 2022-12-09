import { button, td, tr } from "./dom/dom";
import { Editor } from "./dom/Editor";
import { Table } from "./dom/Table";
import { Cars } from "./models/util";
import { CarService } from "./services/CarService";
import { Collections } from "./services/Collection";
import { LocalStorage } from "./services/Storage";

const section: HTMLElement = document.querySelector('#formContainer');
const form = document.getElementById('add-form') as HTMLFormElement;
const editForm = document.getElementById('edit-form') as HTMLFormElement;
const table = document.querySelector('table');
let tbody = document.querySelector('tbody');
const addBtn = document.querySelector('#add') as HTMLButtonElement;
const storage = new LocalStorage();
const vechicles = new Collections(storage, 'vehicles');
const carService = new CarService(vechicles);
const tableManager = new Table(table, createTableRow, identifyCar);
const addForm = new Editor(form, onSubmit.bind(null, tableManager), ['make', 'model', 'bodyType', 'numberOfSeats', 'transmission', 'rentalPrice', 'type']);
const formEDit = new Editor(editForm, onEdit.bind(null, tableManager), ['id', 'make', 'model', 'bodyType', 'numberOfSeats', 'transmission', 'rentalPrice']);
formEDit.remove();
addForm.remove();
tableManager.element.addEventListener('click', onTableClick);

addBtn.addEventListener('click', (event: SubmitEvent) => {

    addForm.attachTo(section, 'Add Car', section)
});

hydrate(tableManager);


async function hydrate(tableManager: Table) {
    if (localStorage.length != 0) {
        const cars = await carService.filter('transmission');
        for (let item of cars) {
            tableManager.add(item);
        }
    }

}


async function onTableClick(event: MouseEvent) {

    if (event.target instanceof HTMLButtonElement) {

        const id = event.target.parentElement.parentElement.id;

        if (event.target.id == 'edit') {

            formEDit.attachTo(section, 'Edit Car', section);
            const record = tableManager.get(id);
            formEDit.setValues(record);
        } else {


            await carService.delete(id);
            let row = tableManager.getRow(id);
            row.remove();

        }
    }
}


function createTableRow(car: Cars) {
    const row = tr({ carId: car.id, id: car.id },
        td({}, car.id,),
        td({}, car.make),
        td({}, car.model),
        td({}, car.bodyType),
        td({}, car.numberOfSeats.toString()),
        td({}, car.transmission),
        td({}, `$${car.rentalPrice}/day`),
        td({}, button({ className: 'action', id: 'edit' }, 'Edit'), button({ className: 'action', id: 'cancel' }, 'Delete'))
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
        rentalPrice,
        type: 'car',
        status: 'Available',
        rentedTo: null
    });

    tableManager.add(result);
    addForm.clear()
    addForm.remove();
}

async function onEdit(tableManager: Table, { id, make, model, bodyType, numberOfSeats, transmission, rentalPrice }) {


    const result = await carService.update(id, { make, model, bodyType, numberOfSeats, transmission, rentalPrice });
    tableManager.replace(id, result);
    formEDit.clear();
    formEDit.remove();

}