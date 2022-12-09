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

function createTableRow(vehicle: Car| Truck) {
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
    if (localStorage.length != 0) {
        const vechicles = await service.getAll();
        for (let item of vechicles) {
            tableManager.add(item);
        }
    }

}


async function onSubmit(tableManager: Table, { type, availableOnly }) {
    let p = document.querySelectorAll('table tr')
    let rows = Array.from(p);

   let filterVehicles = await service.filter(type);
    const data = await service.filter(type);
   
    for (let row of rows) {

        if (row.id) {
            let id = row.id

            tableManager.remove(id)
        }

    }
    if (availableOnly == 'on') {
        filterVehicles = await service.filter(type, availableOnly);
        console.log(availableOnly,filterVehicles)
    }
  
   
    for (let item of filterVehicles) {
        tableManager.add(item);
    }
}