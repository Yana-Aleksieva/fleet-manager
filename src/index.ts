import { a, button, td, tr } from "./dom/dom";
import { Editor } from "./dom/Editor";
import { Table } from "./dom/Table";
import { Car } from "./models/Car";
import { Truck } from "./models/Truck";
import { Vechicle } from "./models/Vechicle";
import { Vechicles } from "./models/Vechicles";
import { Collections } from "./services/Collection";
import { LocalStorage } from "./services/Storage";
import { VechicleService } from "./services/VechicleService";


const storage = new LocalStorage();
const vechicles = new Collections(storage, 'vehicles');
const service = new VechicleService(vechicles);
const filterForm: HTMLFormElement = document.querySelector('#filter-form');
const table = document.querySelector('table');
const tableManager = new Table(table, createTableRow, identifyCar);
const form = new Editor(filterForm, onSubmit.bind(null, tableManager), ['type', 'availableOnly'])

hydrate(tableManager);

function createTableRow(vehicle: Car | Truck) {
    const row = tr({ vechicleId: vehicle.id, id: vehicle.id },
        td({}, vehicle.id,),
        td({}, vehicle.type,),
        td({}, vehicle.make),
        td({}, vehicle.model),
        td({}, `$${vehicle.rentalPrice}/day`),
        td({}, vehicle.status),
        td({}, a({ className: 'details-link', href: `/details.html?${vehicle.id}` }, 'Details'))
    )

    return row;
}

function identifyCar(vechicles: Vechicles[], id: string) {
    return vechicles.find(e => e.id == id);
}

async function hydrate(tableManager: Table) {

    let sorted = await service.sort();

    if (sorted.length > 0) {


        for (let item of sorted) {
            tableManager.add(item);
        }
        tableManager.show();
    }
}


async function onSubmit(tableManager: Table, { type, availableOnly }) {
    let tr = document.querySelectorAll('table tr')
    let rows = Array.from(tr);

    let filterVehicles = await service.filter(type);


    for (let row of rows) {

        if (row.id) {
            let id = row.id

            tableManager.remove(id)
        }

    }
    if (availableOnly == 'on') {
        filterVehicles = await service.filter(type, availableOnly);

    }

    filterVehicles = filterVehicles.sort((a, b) => Number(a.rentalPrice) - Number(b.rentalPrice));
    for (let item of filterVehicles) {
        tableManager.add(item);
    }
}