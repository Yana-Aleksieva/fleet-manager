
import { button, div, form, input, label, p, span, strong } from "./dom/dom";
import { Editor } from "./dom/Editor";
import { Vechicles } from "./models/Vechicles";
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
    console.log(vechicle)

    createDetails(vechicle);
    const section = document.querySelector('.rental').children[1];
    const forms = document.querySelector('form');
    const btn = document.querySelector('.action.release');
    if (vechicle.status === 'Available') {
        btn.parentElement.style.display = 'none'
        console.log(section)

        const newForm = new Editor(forms, onRented.bind({}), ['name']);
        function onRented({ name }) {

            vechicle.rentedTo = name;
            vechicle.status = 'Rented';
            vechicles.update(vechicle.id, vechicle);

            newForm.clear();
            forms.style.display = 'none'
            btn.parentElement.style.display = 'block'
        }
    } else {

        forms.style.display = 'none'
        btn.addEventListener('click', onClick);

        function onClick(e) {
            btn.parentElement.style.display = 'none';
            vechicle.rentedTo = null;
            vechicle.status = 'Available';
            vechicles.update(vechicle.id, vechicle);

            forms.style.display = 'block';
            const newForm = new Editor(forms, onRented.bind({}), ['name']);
            function onRented({ name }) {

                vechicle.rentedTo = name;
                vechicle.status = 'Rented';
                vechicles.update(vechicle.id, vechicle);

                newForm.clear();
                forms.style.display = 'none'
                btn.parentElement.style.display = 'block'
            }
        }
    }

}


start();



function createDetails(vechicle) {

    const section = div({ vehicle: vechicle.id, className: 'details' },
        p({}, span({ className: 'col' }, `ID: `), strong({}, `${vechicle.id}`)),
        p({}, span({ className: 'col' }, `Body type: `), strong({}, `${vechicle.bodyType || vechicle.cargoType}`)),
        p({}, span({ className: 'col' }, `Seats: `), strong({}, `${vechicle.numberOfSeats || vechicle.capacity}`)),
        p({}, span({ className: 'col' }, `Transmission: `), strong({}, `${vechicle.transmission || vechicle.cargoType}`)),

    );
    const rentalSection = div({ vehicle: vechicle.id, className: 'rental' },
        p({}, span({ className: 'col' }, `Status: `), strong({}, `${vechicle.status}`)),
        p({}, span({ className: 'col' }, `Rented to: `),
            strong({}, `${vechicle.rentedTo}`),
            button({ className: 'action release' }, `End contract`)),
        form({ id: 'rent' }, label({}, span({ className: 'col' }), `Rent to: `,
            input({ type: 'text', name: 'name' }, `${vechicle.model}`)),
            button({ className: 'action rent' }, `Confirm`)));
    return main.append(section, rentalSection);
}