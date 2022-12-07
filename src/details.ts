
import { button, div, form, input, label, p, span, strong } from "./dom/dom";
import { Editor } from "./dom/Editor";
import { Vechicles } from "./models/Vechicles";
import { Collections } from "./services/Collection";
import { LocalStorage } from "./services/Storage";
import { VechicleService } from "./services/VechicleService";


const id = window.location.search.substring(1);

console.log(id);

const storage = new LocalStorage();
const vechicles = new Collections(storage, 'vehicles');
const service = new VechicleService(vechicles);

const main = document.querySelector('main');



async function start() {
    let vechicle = await service.getById(id);

    if (vechicle.type === 'car') {

    }
    const section = div({ vehicle: vechicle.id, className: 'details' },
        p({}, span({ className: 'col' }, `ID: `), strong({}, `${vechicle.id}`)),
        p({}, span({ className: 'col' }, `Body type: `), strong({}, `${vechicle.rentalPrice}`)),
        p({}, span({ className: 'col' }, `Seats: `), strong({}, `${vechicle.make}`)),
        p({}, span({ className: 'col' }, `Transmission: `), strong({}, `${vechicle.model}`)),

    );
    const rentalSection = div({ vehicle: vechicle.id, className: 'rental' },
        p({}, span({ className: 'col' }, `Status: `), strong({}, `${vechicle.status}`)),
        p({}, span({ className: 'col' }, `Rented to: `),
            strong({}, `${vechicle.rentedTo}`),
            button({ className: 'action release' }, `End contract`)),
        form({ id: 'rent' }, label({}, span({ className: 'col' }), `Rent to: `,
            input({ type: 'text', name: 'name' }, `${vechicle.model}`)),
            button({ className: 'action rent' }, `Confirm`)));
    main.append(section, rentalSection);


    // if (vechicle.status === 'Available') {
    //     rentalSection.append(createForm(vechicle));
    //     const forms = document.querySelector('form');
    //     const newForm = new Editor(forms, onRented.bind({}), ['name']);

    //     function onRented({ name }) {
    //         const child = createForm(vechicle)

    //         vechicle.rentedTo = name;
    //         vechicle.status = 'Rented';
    //         vechicles.update(vechicle.id, vechicle);

    //         newForm.clear();
    //         newForm.remove();
    //         rentalSection.append(createContract(vechicle));
    //     }
    // } else {

    //     let child = createContract(vechicle)
    //     rentalSection.append(child);
    //     console.log(document.querySelector('.action.release'));
    //     document.querySelector('.action.release').addEventListener('click', () => {

    //         // console.log()
    //         vechicle.rentedTo = null;
    //         vechicle.status = 'Available';

    //         vechicles.update(id, vechicle);

    //         child.remove()
    //         rentalSection.append(createForm(vechicle));
    //     });
    // }




    console.log(vechicle)
}


start();


function createForm(vechicle: Vechicles) {

    return form({ id: 'rent' }, label({}, span({ className: 'col' }), `Rent to: `,
        input({ type: 'text', name: 'name' }, `${vechicle.model}`)),
        button({ className: 'action rent' }, `Confirm`))
}


function createContract(vechicle) {
    return p({}, span({ className: 'col' }, `Rented to: `),
        strong({}, `${vechicle.rentedTo}`),
        button({ className: 'action release' }, `End contract`))
}