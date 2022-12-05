import { a, button, td, tr } from "./dom/dom";
import { Table } from "./dom/Table";
import { Vechicle } from "./models/Vechicle";
import { Vechicles } from "./models/Vechicles";
import { Collections } from "./services/Collection";
import { DataService } from "./services/Service";
import { LocalStorage } from "./services/Storage";
import { VechicleService } from "./services/VechicleService";


const storage = new LocalStorage();
const vechicles = new Collections(storage, 'vehicles');
const service = new VechicleService(vechicles);

const table = document.querySelector('table');
const tableManager = new Table(table, createTableRow, identifyCar);
hydrate(tableManager)
function createTableRow(vehicle: Vechicles) {
    const row = tr({ vechicleId: vehicle.id, id: vehicle.id },
        td({}, vehicle.id,),
        td({}, vehicle.type,),
        td({}, vehicle.make),
        td({}, vehicle.model),
        td({}, `$${vehicle.rentalPrice}/day`),
        td({}, vehicle.status),
        td({}, a({ className: 'details-link', href:"/details.html?id=0076-5b58" }, 'Details'))
    )

    return row;
}

function identifyCar(vechicles: Vechicles[], id: string) {
    return vechicles.find(e => e.id == id);
}

async function hydrate(tableManager: Table) {
    if (localStorage.length != 0) {
        const cars = await service.getAll();
        for (let item of cars) {
            tableManager.add(item);
        }
    }

}