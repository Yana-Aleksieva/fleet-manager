

import { Details } from "./dom/Details";
import { button, div, form, input, label, p, span, strong } from "./dom/dom";
import { Editor } from "./dom/Editor";
import { getDetails } from "./models/util";
import { Collections } from "./services/Collection";
import { LocalStorage } from "./services/Storage";
import { VechicleService } from "./services/VechicleService";

const id = window.location.search.substring(1);
const storage = new LocalStorage();
const vechicles = new Collections(storage, 'vehicles');
const service = new VechicleService(vechicles);

const main = document.querySelector('main');

async function start() {
    let vechicle = await vechicles.getById(id);
    await createDetails(vechicle);

}

async function onLoad() {

    await start()
    let vechicle = await vechicles.getById(id);


    let span: HTMLElement = document.querySelector('#status');
    let btn: HTMLButtonElement = document.querySelector('.action.release');
    const details = new Details(span, btn, vechicle, vechicles, onClick.bind({}));
    const forms = document.querySelector('form');
    details.setStyle();
    function onClick() {
        forms.style.display = 'block';
        const newForm = new Editor(forms, onRented.bind(null), ['name']);
        function onRented({ name }) {


            vechicle.rentedTo = name;
            vechicle.status = 'Rented';
            vechicles.update(vechicle.id, vechicle);
            newForm.clear();
            forms.style.display = 'none';
            details.setStyle();
            details.setText();
        }

    }
    if (vechicle.status == 'Available') {

        const newForm = new Editor(forms, onRented.bind(null), ['name']);
        function onRented({ name }) {


            vechicle.rentedTo = name;
            vechicle.status = 'Rented';
            vechicles.update(vechicle.id, vechicle);
            newForm.clear();
            forms.style.display = 'none';
            details.setStyle();
            details.setText();
        }


    } else {
        forms.style.display = 'none';
        details.setStyle();
        details.setText();
        vechicle.rentedTo = null;
        vechicle.status = 'Available';
        vechicles.update(vechicle.id, vechicle);
    }

}

onLoad()

async function createDetails(vechicle) {

    console.log(getDetails(vechicle));
    let types = getDetails(vechicle);
    const section = div({ vehicle: vechicle.id, className: 'details' },
        p({}, span({ className: 'col' }, `ID: `), strong({}, `${vechicle.id}`)),
        p({}, span({ className: 'col' }, `${types[2]}: `), strong({}, `${vechicle.bodyType || vechicle.cargoType}`)),
        p({}, span({ className: 'col' }, `${types[3]}:  `), strong({}, `${vechicle.numberOfSeats || vechicle.capacity}`)),
        p({}, span({ className: 'col' }, `${types[4]}:  `), strong({}, `${vechicle.transmission ||vechicle.rentalPrice }`)),

    );
    const rentalSection = await createRentalSection()
    main.append(section, rentalSection);
}

async function createRentalSection() {
    const vechicle = await vechicles.getById(id)
    return div({ vehicle: vechicle.id, className: 'rental' },
        p({}, span({ className: 'col', }, `Status: `), strong({ id: 'status' }, `${vechicle.status}`)),
        p({}, span({ className: 'col' }, `Rented to: `),
            strong({}, `${vechicle.rentedTo}`),
            button({ className: 'action release' }, `End contract`)),
        form({ id: 'rent' }, label({}, span({ className: 'col' }), `Rent to: `,
            input({ type: 'text', name: 'name' }, `${vechicle.type}`)),
            button({ className: 'action rent', type: 'submit' }, `Confirm`)));
}



