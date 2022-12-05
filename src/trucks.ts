import { button, td, tr } from "./dom/dom";
import { Editor } from "./dom/Editor";
import { Table } from "./dom/Table";
import { Cars, Trucks } from "./models/util";
import { CarService } from "./services/CarService";
import { Collections } from "./services/Collection";
import { LocalStorage } from "./services/Storage";
import { TruckService } from "./services/TruckService";

console.log('trucks');


const section: HTMLElement = document.querySelector('#formContainer');
const form = document.getElementById('add-form') as HTMLFormElement;
const editForm = document.getElementById('edit-form') as HTMLFormElement;
const table = document.querySelector('table');
const addBtn = document.querySelector('#addTruck') as HTMLButtonElement;
const storage = new LocalStorage();
const vechicles = new Collections(storage, 'vehicles')

const truckService = new TruckService(vechicles);

const tableManager = new Table(table, createTableRow, identifyCar);
const addForm = new Editor(form, onSubmit.bind(null, tableManager), ['make', 'model', 'cargoType', 'capacity', 'rentalPrice']);
const formEDit = new Editor(editForm, onEdit.bind(null, tableManager), ['id', 'make', 'model', 'cargoType', 'capacity', 'rentalPrice']);
formEDit.remove();
addForm.remove();
tableManager.element.addEventListener('click', onTableClick);


addBtn.addEventListener('click', (event: SubmitEvent) => {

    addForm.attachTo(section, 'Add Truck', section)
});

hydrate(tableManager);


async function hydrate(tableManager: Table) {

    if (localStorage.length != 0) {

        const trucks = await truckService.filter('capacity');
  
        for (let item of trucks) {
            tableManager.add(item);
        }
    }

}


async function onTableClick(event: MouseEvent) {

    if (event.target instanceof HTMLButtonElement) {

        const id = event.target.parentElement.parentElement.id;

        if (event.target.id == 'edit') {

            formEDit.attachTo(section, 'Edit Truck', section);
            const record = tableManager.get(id);
            formEDit.setValues(record);
        } else {


            await truckService.delete(id);
            let row = tableManager.getRow(id);
            row.remove();

        }
    }
}


function createTableRow(truck: Trucks) {
    const row = tr({ truckId: truck.id, id: truck.id },
        td({}, truck.id,),
        td({}, truck.make),
        td({}, truck.model),
        td({}, truck.cargoType),
        td({}, `${truck.capacity}tons`),
        td({}, `$${truck.rentalPrice}/day`),
        td({}, button({ className: 'action', id: 'edit' }, 'Edit'), button({ className: 'action', id: 'cancel' }, 'Delete'))
    )

    return row;
}

function identifyCar(trucks: Trucks[], id: string) {
    return trucks.find(e => e.id == id);
}


async function onSubmit(tableManager: Table, { make, model, cargoType, capacity, rentalPrice }) {

    const result = await truckService.create({
        make,
        model,
        cargoType,
        capacity,
        rentalPrice,
        type: 'truck',
        status: 'Available'
    });

    tableManager.add(result);
    addForm.clear()
    addForm.remove();
}

async function onEdit(tableManager: Table, { id, make, model, cargoType, capacity, rentalPrice }) {

    console.log(id, make)
    const result = await truckService.update(id, { make, model, cargoType, capacity, rentalPrice });
    tableManager.replace(id, result);
    formEDit.clear();
    formEDit.remove();

}