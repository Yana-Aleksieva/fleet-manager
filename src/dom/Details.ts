
import { Collections } from "../services/Collection";


export class Details {

    private vechicle: any
    private button: HTMLButtonElement
    private rentedTo: string
    public span: HTMLElement
    private storage: Collections
    constructor(
        public element: HTMLElement,
        public btn: HTMLButtonElement,
        vechicle: any,
        storage: Collections,
        private callback: (data: object) => any,
    ) {
        this.vechicle = vechicle
        this.button = btn
        this.rentedTo = vechicle.rentedTo
        this.span = element
        
        this.button.addEventListener('click', this.onClick.bind(this));
        this.storage = storage
    }

    setText() {

        this.element.textContent = this.vechicle.status
    }

    setStyle() {
        if (this.vechicle.status == 'Available') {
            this.button.parentElement.style.display = 'none';

        } else {
            this.button.parentElement.style.display = 'block'
            this.button.parentElement.children[1].textContent = this.vechicle.rentedTo
        }
    }

    refresh() {
        this.setStyle()
    }

    setVechicle() {
        this.storage.update(this.vechicle.id, this.vechicle)
    }
    onClick(event) {

        this.vechicle.status = 'Available'
        this.vechicle.rentedTo = null;
        console.log(this.span);
        this.setText();
        this.setStyle()
        this.storage.update(this.vechicle.id, this.vechicle)
        event.target.parentElement.style.display = 'none';
        document.querySelector('form').style.display = 'block'
        this.callback({});
    }
}