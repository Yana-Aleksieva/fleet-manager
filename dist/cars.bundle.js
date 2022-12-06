/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom/Editor.ts":
/*!***************************!*\
  !*** ./src/dom/Editor.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Editor": () => (/* binding */ Editor)
/* harmony export */ });
class Editor {
    form;
    callback;
    propNames;
    name;
    section;
    constructor(form, callback, propNames) {
        this.form = form;
        this.callback = callback;
        this.propNames = propNames;
        this.form.addEventListener('submit', this.onSubmit.bind(this));
    }
    create() {
        this.section.style.display = 'block';
        this.name = document.createElement('h3');
    }
    setValue(name, value) {
        const target = this.form.querySelector(`[name="${name}"]`);
        if (target instanceof HTMLInputElement) {
            if (target.type == 'checkbox') {
                target.checked = value;
            }
            else {
                target.value = value;
            }
        }
        else if (target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement) {
            target.value = value;
        }
    }
    setValues(data) {
        for (let [key, value] of Object.entries(data)) {
            this.setValue(key, value);
        }
    }
    clear() {
        this.name.textContent = '';
        this.form.reset();
    }
    remove() {
        this.form.remove();
    }
    attachTo(parent, name, section) {
        this.section = section;
        this.create();
        this.name.textContent = name;
        parent.appendChild(this.name);
        parent.appendChild(this.form);
    }
    onSubmit(event) {
        event.preventDefault();
        if (event.submitter.id) {
            if (event.submitter.id != 'cancel') {
                const formData = new FormData(this.form);
                const data = Object.fromEntries(this.propNames.map(n => [n, formData.get(n)]));
                this.callback(data);
                this.section.style.display = 'none';
            }
            else {
                this.clear();
                this.remove();
                this.section.style.display = 'none';
            }
        }
        else {
            const formData = new FormData(this.form);
            const data = Object.fromEntries(this.propNames.map(n => [n, formData.get(n)]));
            this.callback(data);
        }
    }
}


/***/ }),

/***/ "./src/dom/Table.ts":
/*!**************************!*\
  !*** ./src/dom/Table.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Table": () => (/* binding */ Table)
/* harmony export */ });
class Table {
    element;
    createRow;
    identify;
    records = [];
    rows = new Map();
    constructor(element, createRow, identify, records) {
        this.element = element;
        this.createRow = createRow;
        this.identify = identify;
        if (records) {
            this.records = records;
        }
        this.records.forEach(this.add.bind(this));
    }
    add(record) {
        const row = this.createRow(record);
        this.element.appendChild(row);
        this.records.push(record);
        this.rows.set(record, row);
    }
    get(id) {
        if (typeof this.identify == 'function') {
            const result = this.identify(this.records, id);
            return result;
        }
        throw new ReferenceError('Indetity function not specified');
    }
    getRow(id) {
        const record = this.get(id);
        return this.rows.get(record);
    }
    remove(id) {
        const data = this.get(id);
        const index = this.records.findIndex(d => d == data);
        const row = this.getRow(id);
        row.remove();
        this.rows.delete(data);
        // Update record in collection
        this.records.splice(index, 1);
    }
    replace(id, data) {
        const record = this.get(id);
        const index = this.records.findIndex(r => r == record);
        const row = this.getRow(id);
        // Update row in DOM and collection
        const newRow = this.createRow(data);
        row.replaceWith(newRow);
        this.rows.set(record, newRow);
        // Update record in collection
        this.records.splice(index, 1, data);
    }
    clear() {
        for (let row of (this.rows)) {
            const values = Object.entries(row[0]);
            //console.log(this.rows);
            if (this.getRow(values[0][1])) {
                console.log(this.getRow(values[0][1]));
                const row = this.getRow(values[0][1]);
                row.remove();
            }
        }
    }
}


/***/ }),

/***/ "./src/dom/dom.ts":
/*!************************!*\
  !*** ./src/dom/dom.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "a": () => (/* binding */ a),
/* harmony export */   "button": () => (/* binding */ button),
/* harmony export */   "dom": () => (/* binding */ dom),
/* harmony export */   "table": () => (/* binding */ table),
/* harmony export */   "tbody": () => (/* binding */ tbody),
/* harmony export */   "td": () => (/* binding */ td),
/* harmony export */   "th": () => (/* binding */ th),
/* harmony export */   "thead": () => (/* binding */ thead),
/* harmony export */   "tr": () => (/* binding */ tr)
/* harmony export */ });
function dom(type, props, ...content) {
    const element = document.createElement(type);
    if (props) {
        for (let propName in props) {
            if (propName.startsWith('on')) {
                const eventName = propName.slice(2).toLowerCase();
                element.addEventListener(eventName, props[propName]);
            }
            else if (propName.startsWith('data')) {
                const dataName = propName.slice(4, 5).toLowerCase() + propName.slice(5);
                element.dataset[dataName] = props[propName];
            }
            else {
                element[propName] = props[propName];
            }
        }
    }
    for (let item of content) {
        element.append(item);
    }
    return element;
}
const table = dom.bind(null, 'table');
const thead = dom.bind(null, 'thead');
const tbody = dom.bind(null, 'tbody');
const tr = dom.bind(null, 'tr');
const th = dom.bind(null, 'th');
const td = dom.bind(null, 'td');
const button = dom.bind(null, 'button');
const a = dom.bind(null, 'a');


/***/ }),

/***/ "./src/models/Car.ts":
/*!***************************!*\
  !*** ./src/models/Car.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Car": () => (/* binding */ Car)
/* harmony export */ });
/* harmony import */ var _Vechicle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vechicle */ "./src/models/Vechicle.ts");

class Car extends _Vechicle__WEBPACK_IMPORTED_MODULE_0__.Vechicle {
    type;
    bodyType;
    numberOfSeats;
    transmission;
    constructor(id, make, model, bodyType, numberOfSeats, transmission, rentalPrice, rentedTo) {
        super();
        this.id = id,
            this.make = make,
            this.model = model,
            this.bodyType = bodyType,
            this.numberOfSeats = numberOfSeats,
            this.transmission = transmission,
            this.rentalPrice = rentalPrice,
            this.rentedTo === undefined ? null : this.rentedTo = rentedTo,
            this.type = 'car';
    }
}
// For `Car`:
// - `bodyType`: one of **sedan**, **suv** or **hatchback**
// - `numberOfSeats`: number
// - `transmission`: one of **manual** or **automatic**


/***/ }),

/***/ "./src/models/Vechicle.ts":
/*!********************************!*\
  !*** ./src/models/Vechicle.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Vechicle": () => (/* binding */ Vechicle)
/* harmony export */ });
class Vechicle {
    id;
    make;
    model;
    rentalPrice;
    rentedTo;
}
// Create abstract model `Vehicle` with properties:
// - `id`: string
// - `make`: string
// - `model`: string
// - `rentalPrice`: number
// - `rentedTo`: string or null


/***/ }),

/***/ "./src/models/util.ts":
/*!****************************!*\
  !*** ./src/models/util.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateId": () => (/* binding */ generateId)
/* harmony export */ });
function generateId() {
    return '0000-0000'.replace(/0/g, () => (Math.random() * 16 | 0).toString(16));
}


/***/ }),

/***/ "./src/services/CarService.ts":
/*!************************************!*\
  !*** ./src/services/CarService.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CarService": () => (/* binding */ CarService)
/* harmony export */ });
/* harmony import */ var _models_Car__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/Car */ "./src/models/Car.ts");
/* harmony import */ var _Service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Service */ "./src/services/Service.ts");


class CarService extends _Service__WEBPACK_IMPORTED_MODULE_1__.DataService {
    parseRecord(record) {
        const data = record;
        const result = new _models_Car__WEBPACK_IMPORTED_MODULE_0__.Car(data.id, data.make, data.model, data.bodyType, data.numberOfSeats, data.transmission, data.rentalPrice);
        return result;
    }
    validate(data) {
        // if (typeof data.bodyType != 'string') {
        //     throw new TypeError('Incompatible record. Invalid property "body');
        // }
        // if (typeof data.numbersOfSeats != 'number') {
        //     throw new TypeError('Incompatible record. Invalid property "seats"');
        // }
        // if (typeof data.rentalPrice != 'number') {
        //     throw new TypeError('Incompatible record. Invalid property "rent"');
        // }
    }
}


/***/ }),

/***/ "./src/services/Collection.ts":
/*!************************************!*\
  !*** ./src/services/Collection.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Collections": () => (/* binding */ Collections)
/* harmony export */ });
class Collections {
    storage;
    name;
    constructor(storage, name) {
        this.storage = storage;
        this.name = name;
    }
    getAll() {
        return this.storage.getAll(this.name);
    }
    getById(id) {
        return this.storage.getById(this.name, id);
    }
    create(data) {
        return this.storage.create(this.name, data);
    }
    update(id, data) {
        return this.storage.update(this.name, id, data);
    }
    delete(id) {
        return this.storage.delete(this.name, id);
    }
    async filter(criteria) {
        return (await this.getAll()).filter(obj => obj.hasOwnProperty(criteria));
    }
}


/***/ }),

/***/ "./src/services/Service.ts":
/*!*********************************!*\
  !*** ./src/services/Service.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataService": () => (/* binding */ DataService)
/* harmony export */ });
class DataService {
    collection;
    constructor(collection) {
        this.collection = collection;
    }
    async getAll() {
        const records = (await this.collection.getAll()).map(r => this.parseRecord(r));
        return records;
    }
    async getById(id) {
        const record = await this.collection.getById(id);
        return this.parseRecord(record);
    }
    async create(data) {
        // this.validate(data);
        const record = await this.collection.create(data);
        return this.parseRecord(record);
    }
    async update(id, data) {
        //this.validate(data);
        const record = await this.collection.update(id, data);
        return this.parseRecord(record);
    }
    async delete(id) {
        return this.collection.delete(id);
    }
    async filter(criteria) {
        let result;
        if (criteria.endsWith('s')) {
            result = (await this.collection.getAll()).filter(obj => obj.type === criteria.substring(0, criteria.length - 1));
            //console.log(criteria.substring(0, criteria.length-1))
        }
        else if (criteria.includes('0')) {
            result = (await this.collection.getAll());
        }
        else {
            result = (await this.collection.getAll()).filter(obj => obj.hasOwnProperty(criteria));
        }
        return result;
    }
}


/***/ }),

/***/ "./src/services/Storage.ts":
/*!*********************************!*\
  !*** ./src/services/Storage.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LocalStorage": () => (/* binding */ LocalStorage)
/* harmony export */ });
/* harmony import */ var _models_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/util */ "./src/models/util.ts");

class LocalStorage {
    getAll(collectionName) {
        return JSON.parse(localStorage.getItem(collectionName) || null) || [];
    }
    async getById(collectionName, id) {
        const items = await this.getAll(collectionName);
        const result = items.find(i => i.id == id);
        return result;
    }
    async create(collectionName, data) {
        const items = await this.getAll(collectionName);
        const record = Object.assign({}, data, { id: (0,_models_util__WEBPACK_IMPORTED_MODULE_0__.generateId)() });
        items.push(record);
        localStorage.setItem(collectionName, JSON.stringify(items));
        return record;
    }
    async update(collectionName, id, data) {
        const items = await this.getAll(collectionName);
        const index = items.findIndex(i => i.id == id);
        if (index == -1) {
            throw new ReferenceError(`Record ${id} not found in "${collectionName}"`);
        }
        const record = Object.assign({}, data, { id });
        items[index] = record;
        localStorage.setItem(collectionName, JSON.stringify(items));
        return record;
    }
    async delete(collectionName, id) {
        const items = await this.getAll(collectionName);
        const index = items.findIndex(i => i.id == id);
        if (index == -1) {
            throw new ReferenceError(`Record ${id} not found in "${collectionName}"`);
        }
        items.splice(index, 1);
        localStorage.setItem(collectionName, JSON.stringify(items));
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/cars.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom/dom */ "./src/dom/dom.ts");
/* harmony import */ var _dom_Editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom/Editor */ "./src/dom/Editor.ts");
/* harmony import */ var _dom_Table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom/Table */ "./src/dom/Table.ts");
/* harmony import */ var _services_CarService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/CarService */ "./src/services/CarService.ts");
/* harmony import */ var _services_Collection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/Collection */ "./src/services/Collection.ts");
/* harmony import */ var _services_Storage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/Storage */ "./src/services/Storage.ts");






const section = document.querySelector('#formContainer');
const form = document.getElementById('add-form');
const editForm = document.getElementById('edit-form');
const table = document.querySelector('table');
const addBtn = document.querySelector('#add');
const storage = new _services_Storage__WEBPACK_IMPORTED_MODULE_5__.LocalStorage();
const vechicles = new _services_Collection__WEBPACK_IMPORTED_MODULE_4__.Collections(storage, 'vehicles');
const carService = new _services_CarService__WEBPACK_IMPORTED_MODULE_3__.CarService(vechicles);
const tableManager = new _dom_Table__WEBPACK_IMPORTED_MODULE_2__.Table(table, createTableRow, identifyCar);
const addForm = new _dom_Editor__WEBPACK_IMPORTED_MODULE_1__.Editor(form, onSubmit.bind(null, tableManager), ['make', 'model', 'bodyType', 'numberOfSeats', 'transmission', 'rentalPrice', 'type']);
const formEDit = new _dom_Editor__WEBPACK_IMPORTED_MODULE_1__.Editor(editForm, onEdit.bind(null, tableManager), ['id', 'make', 'model', 'bodyType', 'numberOfSeats', 'transmission', 'rentalPrice']);
formEDit.remove();
addForm.remove();
tableManager.element.addEventListener('click', onTableClick);
addBtn.addEventListener('click', (event) => {
    addForm.attachTo(section, 'Add Car', section);
});
hydrate(tableManager);
async function hydrate(tableManager) {
    if (localStorage.length != 0) {
        const cars = await carService.filter('numberOfSeats');
        for (let item of cars) {
            tableManager.add(item);
        }
    }
}
async function onTableClick(event) {
    if (event.target instanceof HTMLButtonElement) {
        const id = event.target.parentElement.parentElement.id;
        if (event.target.id == 'edit') {
            formEDit.attachTo(section, 'Edit Car', section);
            const record = tableManager.get(id);
            formEDit.setValues(record);
        }
        else {
            await carService.delete(id);
            let row = tableManager.getRow(id);
            row.remove();
        }
    }
}
function createTableRow(car) {
    const row = (0,_dom_dom__WEBPACK_IMPORTED_MODULE_0__.tr)({ carId: car.id, id: car.id }, (0,_dom_dom__WEBPACK_IMPORTED_MODULE_0__.td)({}, car.id), (0,_dom_dom__WEBPACK_IMPORTED_MODULE_0__.td)({}, car.make), (0,_dom_dom__WEBPACK_IMPORTED_MODULE_0__.td)({}, car.model), (0,_dom_dom__WEBPACK_IMPORTED_MODULE_0__.td)({}, car.bodyType), (0,_dom_dom__WEBPACK_IMPORTED_MODULE_0__.td)({}, car.numberOfSeats.toString()), (0,_dom_dom__WEBPACK_IMPORTED_MODULE_0__.td)({}, car.transmission), (0,_dom_dom__WEBPACK_IMPORTED_MODULE_0__.td)({}, `$${car.rentalPrice}/day`), (0,_dom_dom__WEBPACK_IMPORTED_MODULE_0__.td)({}, (0,_dom_dom__WEBPACK_IMPORTED_MODULE_0__.button)({ className: 'action', id: 'edit' }, 'Edit'), (0,_dom_dom__WEBPACK_IMPORTED_MODULE_0__.button)({ className: 'action', id: 'cancel' }, 'Delete')));
    return row;
}
function identifyCar(cars, id) {
    return cars.find(e => e.id == id);
}
async function onSubmit(tableManager, { make, model, bodyType, numberOfSeats, transmission, rentalPrice }) {
    const result = await carService.create({
        make,
        model,
        bodyType,
        numberOfSeats,
        transmission,
        rentalPrice,
        type: 'car',
        status: 'Available'
    });
    tableManager.add(result);
    addForm.clear();
    addForm.remove();
}
async function onEdit(tableManager, { id, make, model, bodyType, numberOfSeats, transmission, rentalPrice }) {
    const result = await carService.update(id, { make, model, bodyType, numberOfSeats, transmission, rentalPrice });
    tableManager.replace(id, result);
    formEDit.clear();
    formEDit.remove();
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsTUFBTSxFQUFFLENBQUM7QUFFdEIsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2ZsZWV0X21hbmFnZXIvLi9zcmMvZG9tL0VkaXRvci50cyIsIndlYnBhY2s6Ly9mbGVldF9tYW5hZ2VyLy4vc3JjL2RvbS9UYWJsZS50cyIsIndlYnBhY2s6Ly9mbGVldF9tYW5hZ2VyLy4vc3JjL2RvbS9kb20udHMiLCJ3ZWJwYWNrOi8vZmxlZXRfbWFuYWdlci8uL3NyYy9tb2RlbHMvQ2FyLnRzIiwid2VicGFjazovL2ZsZWV0X21hbmFnZXIvLi9zcmMvbW9kZWxzL1ZlY2hpY2xlLnRzIiwid2VicGFjazovL2ZsZWV0X21hbmFnZXIvLi9zcmMvbW9kZWxzL3V0aWwudHMiLCJ3ZWJwYWNrOi8vZmxlZXRfbWFuYWdlci8uL3NyYy9zZXJ2aWNlcy9DYXJTZXJ2aWNlLnRzIiwid2VicGFjazovL2ZsZWV0X21hbmFnZXIvLi9zcmMvc2VydmljZXMvQ29sbGVjdGlvbi50cyIsIndlYnBhY2s6Ly9mbGVldF9tYW5hZ2VyLy4vc3JjL3NlcnZpY2VzL1NlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vZmxlZXRfbWFuYWdlci8uL3NyYy9zZXJ2aWNlcy9TdG9yYWdlLnRzIiwid2VicGFjazovL2ZsZWV0X21hbmFnZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZmxlZXRfbWFuYWdlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZmxlZXRfbWFuYWdlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2ZsZWV0X21hbmFnZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9mbGVldF9tYW5hZ2VyLy4vc3JjL2NhcnMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdGggfSBmcm9tIFwiLi9kb21cIjtcblxuZXhwb3J0IGNsYXNzIEVkaXRvciB7XG4gICAgcHJpdmF0ZSBuYW1lOiBIVE1MSGVhZGluZ0VsZW1lbnRcbiAgICBwcml2YXRlIHNlY3Rpb246IEhUTUxFbGVtZW50XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZm9ybTogSFRNTEZvcm1FbGVtZW50LFxuICAgICAgICBwcml2YXRlIGNhbGxiYWNrOiAoZGF0YTogb2JqZWN0KSA9PiBhbnksXG4gICAgICAgIHByaXZhdGUgcHJvcE5hbWVzOiBzdHJpbmdbXSxcblxuXG4gICAgKSB7XG4gICAgICAgIHRoaXMuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLm9uU3VibWl0LmJpbmQodGhpcykpO1xuXG4gICAgfVxuICAgIGNyZWF0ZSgpIHtcblxuICAgICAgICB0aGlzLnNlY3Rpb24uc3R5bGUuZGlzcGxheSA9ICdibG9jaydcbiAgICAgICAgdGhpcy5uYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICB9XG4gICAgc2V0VmFsdWUobmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZm9ybS5xdWVyeVNlbGVjdG9yKGBbbmFtZT1cIiR7bmFtZX1cIl1gKTtcblxuXG4gICAgICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAodGFyZ2V0LnR5cGUgPT0gJ2NoZWNrYm94Jykge1xuICAgICAgICAgICAgICAgIHRhcmdldC5jaGVja2VkID0gdmFsdWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRhcmdldC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRhcmdldCBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50IHx8IHRhcmdldCBpbnN0YW5jZW9mIEhUTUxUZXh0QXJlYUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRhcmdldC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0VmFsdWVzKGRhdGE6IG9iamVjdCkge1xuICAgICAgICBmb3IgKGxldCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoZGF0YSkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUoa2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhcigpIHtcblxuICAgICAgICB0aGlzLm5hbWUudGV4dENvbnRlbnQgPSAnJztcblxuICAgICAgICB0aGlzLmZvcm0ucmVzZXQoKTtcbiAgICB9XG5cbiAgICByZW1vdmUoKSB7XG5cbiAgICAgICAgdGhpcy5mb3JtLnJlbW92ZSgpO1xuXG5cbiAgICB9XG5cbiAgICBhdHRhY2hUbyhwYXJlbnQ6IE5vZGUsIG5hbWU6IHN0cmluZywgc2VjdGlvbjogSFRNTEVsZW1lbnQpIHtcblxuICAgICAgICB0aGlzLnNlY3Rpb24gPSBzZWN0aW9uO1xuICAgICAgICB0aGlzLmNyZWF0ZSgpO1xuICAgICAgICB0aGlzLm5hbWUudGV4dENvbnRlbnQgPSBuYW1lO1xuICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5uYW1lKTtcbiAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKHRoaXMuZm9ybSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblN1Ym1pdChldmVudDogU3VibWl0RXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKGV2ZW50LnN1Ym1pdHRlci5pZCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnN1Ym1pdHRlci5pZCAhPSAnY2FuY2VsJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKHRoaXMuZm9ybSk7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IE9iamVjdC5mcm9tRW50cmllcyh0aGlzLnByb3BOYW1lcy5tYXAobiA9PiBbbiwgZm9ybURhdGEuZ2V0KG4pXSkpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2soZGF0YSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKHRoaXMuZm9ybSk7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gT2JqZWN0LmZyb21FbnRyaWVzKHRoaXMucHJvcE5hbWVzLm1hcChuID0+IFtuLCBmb3JtRGF0YS5nZXQobildKSk7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrKGRhdGEpO1xuICAgICAgICB9XG5cbiAgICB9XG59IiwiXG5cbmV4cG9ydCBjbGFzcyBUYWJsZSB7XG5cbiAgICBwcml2YXRlIHJlY29yZHM6IGFueVtdID0gW107XG4gICAgcHJpdmF0ZSByb3dzOiBNYXA8b2JqZWN0LCBIVE1MVGFibGVSb3dFbGVtZW50PiA9IG5ldyBNYXAoKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZWxlbWVudDogSFRNTFRhYmxlRWxlbWVudCxcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVSb3c6IChyZWNvcmQ6IGFueSkgPT4gSFRNTFRhYmxlUm93RWxlbWVudCxcbiAgICAgICAgcHJpdmF0ZSBpZGVudGlmeT86IChyZWNvcmRzOiBhbnlbXSwgaWQ6IGFueSkgPT4gYW55LFxuXG4gICAgICAgIHJlY29yZHM/OiBhbnlbXVxuICAgICkge1xuICAgICAgICBpZiAocmVjb3Jkcykge1xuICAgICAgICAgICAgdGhpcy5yZWNvcmRzID0gcmVjb3JkcztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlY29yZHMuZm9yRWFjaCh0aGlzLmFkZC5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBhZGQocmVjb3JkOiBhbnkpIHtcbiAgICAgICAgY29uc3Qgcm93ID0gdGhpcy5jcmVhdGVSb3cocmVjb3JkKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHJvdyk7XG4gICAgICAgIHRoaXMucmVjb3Jkcy5wdXNoKHJlY29yZCk7XG4gICAgICAgIHRoaXMucm93cy5zZXQocmVjb3JkLCByb3cpO1xuICAgIH1cblxuICAgIGdldChpZDogYW55KTogYW55IHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmlkZW50aWZ5ID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuaWRlbnRpZnkodGhpcy5yZWNvcmRzLCBpZCk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcignSW5kZXRpdHkgZnVuY3Rpb24gbm90IHNwZWNpZmllZCcpO1xuICAgIH1cblxuICAgIGdldFJvdyhpZDogYW55KTogSFRNTFRhYmxlUm93RWxlbWVudCB7XG4gICAgICAgIGNvbnN0IHJlY29yZCA9IHRoaXMuZ2V0KGlkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucm93cy5nZXQocmVjb3JkKTtcbiAgICB9XG5cbiAgICByZW1vdmUoaWQ6IGFueSkge1xuXG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmdldChpZCk7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5yZWNvcmRzLmZpbmRJbmRleChkID0+IGQgPT0gZGF0YSk7XG4gICAgICAgIGNvbnN0IHJvdyA9IHRoaXMuZ2V0Um93KGlkKTtcblxuICAgICAgICByb3cucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMucm93cy5kZWxldGUoZGF0YSk7XG5cbiAgICAgICAgLy8gVXBkYXRlIHJlY29yZCBpbiBjb2xsZWN0aW9uXG4gICAgICAgIHRoaXMucmVjb3Jkcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cblxuICAgIHJlcGxhY2UoaWQ6IGFueSwgZGF0YTogYW55KSB7XG5cbiAgICAgICAgY29uc3QgcmVjb3JkID0gdGhpcy5nZXQoaWQpO1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMucmVjb3Jkcy5maW5kSW5kZXgociA9PiByID09IHJlY29yZCk7XG4gICAgICAgIGNvbnN0IHJvdyA9IHRoaXMuZ2V0Um93KGlkKTtcblxuICAgICAgICAvLyBVcGRhdGUgcm93IGluIERPTSBhbmQgY29sbGVjdGlvblxuICAgICAgICBjb25zdCBuZXdSb3cgPSB0aGlzLmNyZWF0ZVJvdyhkYXRhKTtcbiAgICAgICAgcm93LnJlcGxhY2VXaXRoKG5ld1Jvdyk7XG4gICAgICAgIHRoaXMucm93cy5zZXQocmVjb3JkLCBuZXdSb3cpO1xuXG4gICAgICAgIC8vIFVwZGF0ZSByZWNvcmQgaW4gY29sbGVjdGlvblxuICAgICAgICB0aGlzLnJlY29yZHMuc3BsaWNlKGluZGV4LCAxLCBkYXRhKTtcblxuICAgIH1cbiAgICBjbGVhcigpe1xuICAgICBcbiAgICAgICAgZm9yKGxldCByb3cgb2YgKHRoaXMucm93cykpe1xuICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlcyA9IE9iamVjdC5lbnRyaWVzKHJvd1swXSlcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2codGhpcy5yb3dzKTtcbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0Um93KHZhbHVlc1swXVsxXSkpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ2V0Um93KHZhbHVlc1swXVsxXSkpXG4gICAgICAgICAgICAgICAgY29uc3Qgcm93ID0gdGhpcy5nZXRSb3codmFsdWVzWzBdWzFdKTtcbiAgICAgICAgICAgICAgICByb3cucmVtb3ZlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfVxufSIsInR5cGUgRG9tQ29udGVudCA9IHN0cmluZyB8IE5vZGU7XG5cbnR5cGUgZWxlbWVudEZhY3Rvcnk8VCBleHRlbmRzIEhUTUxFbGVtZW50PiA9IChwcm9wcz86IG9iamVjdCwgLi4uY29udGVudDogRG9tQ29udGVudFtdKSA9PiBUO1xuXG5leHBvcnQgZnVuY3Rpb24gZG9tKHR5cGU6IHN0cmluZywgcHJvcHM/OiBvYmplY3QsIC4uLmNvbnRlbnQ6IERvbUNvbnRlbnRbXSkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpO1xuXG4gICAgaWYgKHByb3BzKSB7XG4gICAgICAgIGZvciAobGV0IHByb3BOYW1lIGluIHByb3BzKSB7XG4gICAgICAgICAgICBpZiAocHJvcE5hbWUuc3RhcnRzV2l0aCgnb24nKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGV2ZW50TmFtZSA9IHByb3BOYW1lLnNsaWNlKDIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgcHJvcHNbcHJvcE5hbWVdKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcE5hbWUuc3RhcnRzV2l0aCgnZGF0YScpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YU5hbWUgPSBwcm9wTmFtZS5zbGljZSg0LDUpLnRvTG93ZXJDYXNlKCkgKyBwcm9wTmFtZS5zbGljZSg1KTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmRhdGFzZXRbZGF0YU5hbWVdID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50W3Byb3BOYW1lXSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGl0ZW0gb2YgY29udGVudCkge1xuICAgICAgICBlbGVtZW50LmFwcGVuZChpdGVtKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbn1cblxuZXhwb3J0IGNvbnN0IHRhYmxlOiBlbGVtZW50RmFjdG9yeTxIVE1MVGFibGVFbGVtZW50PiA9IGRvbS5iaW5kKG51bGwsICd0YWJsZScpO1xuZXhwb3J0IGNvbnN0IHRoZWFkOiBlbGVtZW50RmFjdG9yeTxIVE1MVGFibGVTZWN0aW9uRWxlbWVudD4gPSBkb20uYmluZChudWxsLCAndGhlYWQnKTtcbmV4cG9ydCBjb25zdCB0Ym9keTogZWxlbWVudEZhY3Rvcnk8SFRNTFRhYmxlU2VjdGlvbkVsZW1lbnQ+ID0gZG9tLmJpbmQobnVsbCwgJ3Rib2R5Jyk7XG5leHBvcnQgY29uc3QgdHI6IGVsZW1lbnRGYWN0b3J5PEhUTUxUYWJsZVJvd0VsZW1lbnQ+ID0gZG9tLmJpbmQobnVsbCwgJ3RyJyk7XG5leHBvcnQgY29uc3QgdGg6IGVsZW1lbnRGYWN0b3J5PEhUTUxUYWJsZUNlbGxFbGVtZW50PiA9IGRvbS5iaW5kKG51bGwsICd0aCcpO1xuZXhwb3J0IGNvbnN0IHRkOiBlbGVtZW50RmFjdG9yeTxIVE1MVGFibGVDZWxsRWxlbWVudD4gPSBkb20uYmluZChudWxsLCAndGQnKTtcbmV4cG9ydCBjb25zdCBidXR0b246IGVsZW1lbnRGYWN0b3J5PEhUTUxCdXR0b25FbGVtZW50PiA9IGRvbS5iaW5kKG51bGwsICdidXR0b24nKTtcbmV4cG9ydCBjb25zdCBhOiBlbGVtZW50RmFjdG9yeTxIVE1MQW5jaG9yRWxlbWVudD4gPSBkb20uYmluZChudWxsLCAnYScpO1xuIiwiaW1wb3J0IHsgUmVjb3JkSWQgfSBmcm9tIFwiLi4vc2VydmljZXMvU3RvcmFnZVwiO1xuaW1wb3J0IHsgQm9keVR5cGUsIFJlY29yZCwgUmVudGVkLCBUcmFuc21pc3Npb24gfSBmcm9tIFwiLi91dGlsXCI7XG5pbXBvcnQgeyBWZWNoaWNsZSB9IGZyb20gXCIuL1ZlY2hpY2xlXCI7XG5cbmV4cG9ydCBjbGFzcyBDYXIgZXh0ZW5kcyBWZWNoaWNsZSB7XG4gICAgdHlwZTogJ2NhcidcbiAgICBib2R5VHlwZTogQm9keVR5cGVcbiAgICBudW1iZXJPZlNlYXRzOiBudW1iZXJcbiAgICB0cmFuc21pc3Npb246IFRyYW5zbWlzc2lvblxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGlkOiBzdHJpbmcsXG4gICAgICAgIG1ha2U6IHN0cmluZyxcbiAgICAgICAgbW9kZWw6IHN0cmluZyxcblxuICAgICAgICBib2R5VHlwZTogQm9keVR5cGUsXG4gICAgICAgIG51bWJlck9mU2VhdHM6IG51bWJlcixcbiAgICAgICAgdHJhbnNtaXNzaW9uOiBUcmFuc21pc3Npb24sXG4gICAgICAgIHJlbnRhbFByaWNlOiBudW1iZXIsXG4gICAgICAgIHJlbnRlZFRvPzogc3RyaW5nXG5cbiAgICApIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5pZCA9IGlkLFxuICAgICAgICAgICAgdGhpcy5tYWtlID0gbWFrZSxcbiAgICAgICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbCxcbiAgICAgICAgICAgIHRoaXMuYm9keVR5cGUgPSBib2R5VHlwZSxcbiAgICAgICAgICAgIHRoaXMubnVtYmVyT2ZTZWF0cyA9IG51bWJlck9mU2VhdHMsXG4gICAgICAgICAgICB0aGlzLnRyYW5zbWlzc2lvbiA9IHRyYW5zbWlzc2lvbixcbiAgICAgICAgICAgIHRoaXMucmVudGFsUHJpY2UgPSByZW50YWxQcmljZSxcbiAgICAgICAgICAgIHRoaXMucmVudGVkVG8gPT09IHVuZGVmaW5lZCA/IG51bGwgOiB0aGlzLnJlbnRlZFRvID0gcmVudGVkVG8sXG4gICAgICAgICAgICB0aGlzLnR5cGUgPSAnY2FyJ1xuXG5cblxuXG4gICAgfVxufVxuXG5cblxuXG4vLyBGb3IgYENhcmA6XG4vLyAtIGBib2R5VHlwZWA6IG9uZSBvZiAqKnNlZGFuKiosICoqc3V2Kiogb3IgKipoYXRjaGJhY2sqKlxuLy8gLSBgbnVtYmVyT2ZTZWF0c2A6IG51bWJlclxuLy8gLSBgdHJhbnNtaXNzaW9uYDogb25lIG9mICoqbWFudWFsKiogb3IgKiphdXRvbWF0aWMqKlxuIiwiaW1wb3J0IHsgUmVjb3JkSWQgfSBmcm9tIFwiLi4vc2VydmljZXMvU3RvcmFnZVwiO1xuaW1wb3J0IHsgVHJ1Y2sgfSBmcm9tIFwiLi9UcnVja1wiO1xuaW1wb3J0IHsgQ2FycywgUmVjb3JkLCBSZW50ZWQsIFRydWNrcyB9IGZyb20gXCIuL3V0aWxcIjtcblxuXG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBWZWNoaWNsZSB7XG4gICAgaWQ6IFJlY29yZElkXG4gICAgbWFrZTogc3RyaW5nXG4gICAgbW9kZWw6IHN0cmluZ1xuICAgIHJlbnRhbFByaWNlOiBudW1iZXJcbiAgICByZW50ZWRUbz86IHN0cmluZyB8IG51bGxcbn1cbi8vIENyZWF0ZSBhYnN0cmFjdCBtb2RlbCBgVmVoaWNsZWAgd2l0aCBwcm9wZXJ0aWVzOlxuLy8gLSBgaWRgOiBzdHJpbmdcbi8vIC0gYG1ha2VgOiBzdHJpbmdcbi8vIC0gYG1vZGVsYDogc3RyaW5nXG4vLyAtIGByZW50YWxQcmljZWA6IG51bWJlclxuLy8gLSBgcmVudGVkVG9gOiBzdHJpbmcgb3IgbnVsbFxuXG5cbiIsImltcG9ydCB7IFJlY29yZElkIH0gZnJvbSBcIi4uL3NlcnZpY2VzL1N0b3JhZ2VcIjtcblxuZXhwb3J0IGludGVyZmFjZSBSZWNvcmQge1xuICAgIHR5cGU/OiBzdHJpbmc7XG4gICAgaWQ6IHN0cmluZ1xufVxuXG5leHBvcnQgdHlwZSBSZW50ZWQgPSBzdHJpbmcgfCBudWxsO1xuXG5leHBvcnQgdHlwZSBCb2R5VHlwZSA9ICdzZWRhbicgfCAnc3V2JyB8ICdoYXRjaGJhY2snO1xuXG5cbmV4cG9ydCB0eXBlIFRyYW5zbWlzc2lvbiA9ICdtYW51YWwnIHwgJ2F1dG9tYXRpYyc7XG5cbmV4cG9ydCB0eXBlIENhcmdvID0gJ2JveCcgfCAnZmxhdGJlZCcgfCAndmFuJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlSWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJzAwMDAtMDAwMCcucmVwbGFjZSgvMC9nLCAoKSA9PiAoTWF0aC5yYW5kb20oKSAqIDE2IHwgMCkudG9TdHJpbmcoMTYpKTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDYXJzIGV4dGVuZHMgUmVjb3Jke1xuXG4gICAgaWQ6IFJlY29yZElkLFxuICAgIG1ha2U6IHN0cmluZyxcbiAgICBtb2RlbDogc3RyaW5nLFxuICAgIGJvZHlUeXBlOiBCb2R5VHlwZSxcbiAgICBudW1iZXJPZlNlYXRzOiBudW1iZXIsXG4gICAgdHJhbnNtaXNzaW9uOiBUcmFuc21pc3Npb24sXG4gICAgcmVudGFsUHJpY2U6IG51bWJlclxuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHJ1Y2tzIGV4dGVuZHMgUmVjb3Jke1xuXG4gICAgaWQ6IFJlY29yZElkLFxuICAgIG1ha2U6IHN0cmluZyxcbiAgICBtb2RlbDogc3RyaW5nLFxuICAgIGNhcmdvVHlwZTogQ2FyZ28sXG4gICAgY2FwYWNpdHk6IG51bWJlcixcbiAgICByZW50YWxQcmljZTogbnVtYmVyXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVmVjaGljbGUge1xuICAgIGlkOiBSZWNvcmRJZFxuICAgIG1ha2U6IHN0cmluZ1xuICAgIG1vZGVsOiBzdHJpbmdcbiAgICByZW50YWxQcmljZTogbnVtYmVyXG4gICAgcmVudGVkVG8/OiBzdHJpbmcgfCBudWxsXG4gICAgYm9keVRZcGU/IDogc3RyaW5nXG4gICAgbnVtYmVyT2ZTZWF0cz86IG51bWJlclxuICAgIHRyYW5zbWlzc2lvbj8gOiBzdHJpbmdcbiAgICBjYXJnb1R5cGU/OiBudW1iZXJcbiAgICBjYXBhY2l0eT86IG51bWJlclxuICAgIFxuXG59IiwiaW1wb3J0IHsgQ2FyIH0gZnJvbSBcIi4uL21vZGVscy9DYXJcIjtcbmltcG9ydCB7IENhcnMsIFJlY29yZCB9IGZyb20gXCIuLi9tb2RlbHMvdXRpbFwiO1xuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tIFwiLi9TZXJ2aWNlXCI7XG5cblxuZXhwb3J0IGNsYXNzIENhclNlcnZpY2UgZXh0ZW5kcyBEYXRhU2VydmljZTxDYXI+e1xuICAgIHByb3RlY3RlZCBwYXJzZVJlY29yZChyZWNvcmQ6IENhcnMpOiBDYXIge1xuXG4gICAgICAgIGNvbnN0IGRhdGEgPSByZWNvcmQ7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBDYXIoXG4gICAgICAgICAgICBkYXRhLmlkLFxuICAgICAgICAgICAgZGF0YS5tYWtlLFxuICAgICAgICAgICAgZGF0YS5tb2RlbCxcbiAgICAgICAgICAgIGRhdGEuYm9keVR5cGUsXG4gICAgICAgICAgICBkYXRhLm51bWJlck9mU2VhdHMsXG4gICAgICAgICAgICBkYXRhLnRyYW5zbWlzc2lvbixcbiAgICAgICAgICAgIGRhdGEucmVudGFsUHJpY2VcblxuXG5cbiAgICAgICAgKVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgdmFsaWRhdGUoZGF0YTogYW55KTogdm9pZCB7XG4gICAgICAgIC8vIGlmICh0eXBlb2YgZGF0YS5ib2R5VHlwZSAhPSAnc3RyaW5nJykge1xuICAgICAgICAvLyAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW5jb21wYXRpYmxlIHJlY29yZC4gSW52YWxpZCBwcm9wZXJ0eSBcImJvZHknKTtcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBpZiAodHlwZW9mIGRhdGEubnVtYmVyc09mU2VhdHMgIT0gJ251bWJlcicpIHtcbiAgICAgICAgLy8gICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0luY29tcGF0aWJsZSByZWNvcmQuIEludmFsaWQgcHJvcGVydHkgXCJzZWF0c1wiJyk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gaWYgKHR5cGVvZiBkYXRhLnJlbnRhbFByaWNlICE9ICdudW1iZXInKSB7XG4gICAgICAgIC8vICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbmNvbXBhdGlibGUgcmVjb3JkLiBJbnZhbGlkIHByb3BlcnR5IFwicmVudFwiJyk7XG4gICAgICAgIC8vIH1cbiAgICB9XG5cblxuXG59IiwiaW1wb3J0IHsgUmVjb3JkIH0gZnJvbSBcIi4uL21vZGVscy91dGlsXCI7XG5pbXBvcnQgeyBSZWNvcmRJZCwgU3RvcmFnZSB9IGZyb20gXCIuL1N0b3JhZ2VcIjtcblxuXG5leHBvcnQgY2xhc3MgQ29sbGVjdGlvbnMge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgc3RvcmFnZTogU3RvcmFnZSxcbiAgICAgICAgcHJpdmF0ZSBuYW1lOiBzdHJpbmcpIHsgfVxuXG5cblxuXG4gICAgZ2V0QWxsKCk6IFByb21pc2U8UmVjb3JkW10+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5nZXRBbGwodGhpcy5uYW1lKTtcbiAgICB9XG5cbiAgICBnZXRCeUlkKGlkOiBSZWNvcmRJZCk6IFByb21pc2U8UmVjb3JkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZ2V0QnlJZCh0aGlzLm5hbWUsIGlkKTtcbiAgICB9XG5cbiAgICBjcmVhdGUoZGF0YTogYW55KTogUHJvbWlzZTxSZWNvcmQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5jcmVhdGUodGhpcy5uYW1lLCBkYXRhKTtcbiAgICB9XG5cbiAgICB1cGRhdGUoaWQ6IFJlY29yZElkLCBkYXRhOiBhbnkpOiBQcm9taXNlPFJlY29yZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zdG9yYWdlLnVwZGF0ZSh0aGlzLm5hbWUsIGlkLCBkYXRhKTtcbiAgICB9XG5cbiAgICBkZWxldGUoaWQ6IFJlY29yZElkKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZGVsZXRlKHRoaXMubmFtZSwgaWQpO1xuICAgIH1cbiAgICBhc3luYyBmaWx0ZXIoY3JpdGVyaWE6IHN0cmluZyk6IFByb21pc2U8UmVjb3JkW10+IHtcbiAgICAgICAgcmV0dXJuICAgKGF3YWl0IHRoaXMuZ2V0QWxsKCkpLmZpbHRlcihvYmogPT4gb2JqLmhhc093blByb3BlcnR5KGNyaXRlcmlhKSk7XG4gICAgICAgXG4gICAgICAgIFxuICAgICAgIH1cbn0iLCJpbXBvcnQgeyBSZWNvcmQgfSBmcm9tIFwiLi4vbW9kZWxzL3V0aWxcIjtcbmltcG9ydCB7IENvbGxlY3Rpb25zIH0gZnJvbSBcIi4vQ29sbGVjdGlvblwiO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VydmljZTxUPiB7XG5cblxuICAgIGdldEFsbCgpOiBQcm9taXNlPFRbXT47XG4gICAgZ2V0QnlJZChpZDogc3RyaW5nKTogUHJvbWlzZTxUPjtcbiAgICBjcmVhdGUoZGF0YSk6IFByb21pc2U8VD47XG4gICAgdXBkYXRlKGlkOiBhbnksIGRhdGE6IGFueSk6IFByb21pc2U8VD5cbiAgICBkZWxldGUoaWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD5cblxufVxuXG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEYXRhU2VydmljZTxUPiBpbXBsZW1lbnRzIFNlcnZpY2U8VD57XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBjb2xsZWN0aW9uOiBDb2xsZWN0aW9uc1xuICAgICkgeyB9XG4gICAgYXN5bmMgZ2V0QWxsKCk6IFByb21pc2U8VFtdPiB7XG4gICAgICAgIGNvbnN0IHJlY29yZHMgPSAoYXdhaXQgdGhpcy5jb2xsZWN0aW9uLmdldEFsbCgpKS5tYXAociA9PiB0aGlzLnBhcnNlUmVjb3JkKHIpKTtcblxuICAgICAgICByZXR1cm4gcmVjb3JkcztcbiAgICB9XG4gICAgYXN5bmMgZ2V0QnlJZChpZDogc3RyaW5nKTogUHJvbWlzZTxUPiB7XG4gICAgICAgIGNvbnN0IHJlY29yZCA9IGF3YWl0IHRoaXMuY29sbGVjdGlvbi5nZXRCeUlkKGlkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VSZWNvcmQocmVjb3JkKTtcbiAgICB9XG4gICAgYXN5bmMgY3JlYXRlKGRhdGE6IGFueSk6IFByb21pc2U8VD4ge1xuICAgICAgICAvLyB0aGlzLnZhbGlkYXRlKGRhdGEpO1xuICAgICAgICBjb25zdCByZWNvcmQgPSBhd2FpdCB0aGlzLmNvbGxlY3Rpb24uY3JlYXRlKGRhdGEpO1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJzZVJlY29yZChyZWNvcmQpO1xuICAgIH1cbiAgICBhc3luYyB1cGRhdGUoaWQ6IGFueSwgZGF0YTogYW55KTogUHJvbWlzZTxUPiB7XG4gICAgICAgIC8vdGhpcy52YWxpZGF0ZShkYXRhKTtcbiAgICAgICAgY29uc3QgcmVjb3JkID0gYXdhaXQgdGhpcy5jb2xsZWN0aW9uLnVwZGF0ZShpZCwgZGF0YSk7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlUmVjb3JkKHJlY29yZCk7XG4gICAgfVxuICAgIGFzeW5jIGRlbGV0ZShpZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbGxlY3Rpb24uZGVsZXRlKGlkKTtcbiAgICB9XG5cbiAgICBhc3luYyBmaWx0ZXIoY3JpdGVyaWE6IHN0cmluZykge1xuXG5cbiAgICAgICAgbGV0IHJlc3VsdFxuICAgICAgICBpZiAoY3JpdGVyaWEuZW5kc1dpdGgoJ3MnKSkge1xuICAgICAgICAgICAgcmVzdWx0ID0gKGF3YWl0IHRoaXMuY29sbGVjdGlvbi5nZXRBbGwoKSkuZmlsdGVyKG9iaiA9PiBvYmoudHlwZSA9PT0gY3JpdGVyaWEuc3Vic3RyaW5nKDAsIGNyaXRlcmlhLmxlbmd0aC0xKSk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGNyaXRlcmlhLnN1YnN0cmluZygwLCBjcml0ZXJpYS5sZW5ndGgtMSkpXG4gICAgICAgIH1lbHNlIGlmIChjcml0ZXJpYS5pbmNsdWRlcygnMCcpKXtcbiAgICAgICAgICAgIHJlc3VsdCA9IChhd2FpdCB0aGlzLmNvbGxlY3Rpb24uZ2V0QWxsKCkpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmVzdWx0ID0gKGF3YWl0IHRoaXMuY29sbGVjdGlvbi5nZXRBbGwoKSkuZmlsdGVyKG9iaiA9PiBvYmouaGFzT3duUHJvcGVydHkoY3JpdGVyaWEpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgfVxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBwYXJzZVJlY29yZChyZWNvcmQ6IFJlY29yZCk6IFRcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgdmFsaWRhdGUoZGF0YTogYW55KTogdm9pZFxufVxuIiwiaW1wb3J0IHsgZ2VuZXJhdGVJZCB9IGZyb20gXCIuLi9tb2RlbHMvdXRpbFwiO1xuXG5cblxuZXhwb3J0IHR5cGUgUmVjb3JkSWQgPSBzdHJpbmc7XG5cbmV4cG9ydCB0eXBlIFJlY29yZCA9IHtcbiAgICBpZDogUmVjb3JkSWQ7XG59XG5cblxuZXhwb3J0ICBpbnRlcmZhY2UgU3RvcmFnZSB7XG4gICAgZ2V0QWxsKGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcpOiBQcm9taXNlPFJlY29yZFtdPjtcbiAgICBnZXRCeUlkKGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcsIGlkOiBSZWNvcmRJZCk6IFByb21pc2U8UmVjb3JkPjtcbiAgICBjcmVhdGUoY29sbGVjdGlvbk5hbWU6IHN0cmluZywgZGF0YTogYW55KTogUHJvbWlzZTxSZWNvcmQ+O1xuICAgIHVwZGF0ZShjb2xsZWN0aW9uTmFtZTogc3RyaW5nLCBpZDogUmVjb3JkSWQsIGRhdGE6IGFueSk6IFByb21pc2U8UmVjb3JkPjtcbiAgICBkZWxldGUoY29sbGVjdGlvbk5hbWU6IHN0cmluZywgaWQ6IFJlY29yZElkKTogUHJvbWlzZTx2b2lkPjtcbn1cblxuXG5leHBvcnQgY2xhc3MgTG9jYWxTdG9yYWdlIGltcGxlbWVudHMgU3RvcmFnZSB7XG4gICAgZ2V0QWxsKGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcpOiBQcm9taXNlPFJlY29yZFtdPiB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGNvbGxlY3Rpb25OYW1lKSB8fCBudWxsKSB8fCBbXTtcbiAgICB9XG4gICAgYXN5bmMgZ2V0QnlJZChjb2xsZWN0aW9uTmFtZTogc3RyaW5nLCBpZDogc3RyaW5nKTogUHJvbWlzZTxSZWNvcmQ+IHtcbiAgICAgICAgY29uc3QgaXRlbXMgPSBhd2FpdCB0aGlzLmdldEFsbChjb2xsZWN0aW9uTmFtZSk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGl0ZW1zLmZpbmQoaSA9PiBpLmlkID09IGlkKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgYXN5bmMgY3JlYXRlKGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcsIGRhdGE6IGFueSk6IFByb21pc2U8UmVjb3JkPiB7XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gYXdhaXQgdGhpcy5nZXRBbGwoY29sbGVjdGlvbk5hbWUpO1xuICAgICAgICBjb25zdCByZWNvcmQgPSBPYmplY3QuYXNzaWduKHt9LCBkYXRhLCB7IGlkOiBnZW5lcmF0ZUlkKCkgfSk7XG4gICAgICAgIGl0ZW1zLnB1c2gocmVjb3JkKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oY29sbGVjdGlvbk5hbWUsIEpTT04uc3RyaW5naWZ5KGl0ZW1zKSk7XG5cbiAgICAgICAgcmV0dXJuIHJlY29yZDtcbiAgICB9XG4gICAgYXN5bmMgdXBkYXRlKGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcsIGlkOiBzdHJpbmcsIGRhdGE6IGFueSk6IFByb21pc2U8UmVjb3JkPiB7XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gYXdhaXQgdGhpcy5nZXRBbGwoY29sbGVjdGlvbk5hbWUpO1xuICAgICAgICBjb25zdCBpbmRleCA9IGl0ZW1zLmZpbmRJbmRleChpID0+IGkuaWQgPT0gaWQpO1xuICAgICAgICBpZiAoaW5kZXggPT0gLTEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihgUmVjb3JkICR7aWR9IG5vdCBmb3VuZCBpbiBcIiR7Y29sbGVjdGlvbk5hbWV9XCJgKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZWNvcmQgPSBPYmplY3QuYXNzaWduKHt9LCBkYXRhLCB7IGlkIH0pO1xuICAgICAgICBpdGVtc1tpbmRleF0gPSByZWNvcmQ7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGNvbGxlY3Rpb25OYW1lLCBKU09OLnN0cmluZ2lmeShpdGVtcykpO1xuXG4gICAgICAgIHJldHVybiByZWNvcmQ7XG4gICAgfVxuICAgIGFzeW5jIGRlbGV0ZShjb2xsZWN0aW9uTmFtZTogc3RyaW5nLCBpZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gYXdhaXQgdGhpcy5nZXRBbGwoY29sbGVjdGlvbk5hbWUpO1xuICAgICAgICBjb25zdCBpbmRleCA9IGl0ZW1zLmZpbmRJbmRleChpID0+IGkuaWQgPT0gaWQpO1xuICAgICAgICBpZiAoaW5kZXggPT0gLTEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihgUmVjb3JkICR7aWR9IG5vdCBmb3VuZCBpbiBcIiR7Y29sbGVjdGlvbk5hbWV9XCJgKTtcbiAgICAgICAgfVxuICAgICAgICBpdGVtcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShjb2xsZWN0aW9uTmFtZSwgSlNPTi5zdHJpbmdpZnkoaXRlbXMpKTtcbiAgICB9XG5cbn1cblxuXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGJ1dHRvbiwgdGQsIHRyIH0gZnJvbSBcIi4vZG9tL2RvbVwiO1xuaW1wb3J0IHsgRWRpdG9yIH0gZnJvbSBcIi4vZG9tL0VkaXRvclwiO1xuaW1wb3J0IHsgVGFibGUgfSBmcm9tIFwiLi9kb20vVGFibGVcIjtcbmltcG9ydCB7IENhcnMgfSBmcm9tIFwiLi9tb2RlbHMvdXRpbFwiO1xuaW1wb3J0IHsgQ2FyU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL0NhclNlcnZpY2VcIjtcbmltcG9ydCB7IENvbGxlY3Rpb25zIH0gZnJvbSBcIi4vc2VydmljZXMvQ29sbGVjdGlvblwiO1xuaW1wb3J0IHsgTG9jYWxTdG9yYWdlIH0gZnJvbSBcIi4vc2VydmljZXMvU3RvcmFnZVwiO1xuXG5jb25zdCBzZWN0aW9uOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb3JtQ29udGFpbmVyJyk7XG5jb25zdCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC1mb3JtJykgYXMgSFRNTEZvcm1FbGVtZW50O1xuY29uc3QgZWRpdEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZWRpdC1mb3JtJykgYXMgSFRNTEZvcm1FbGVtZW50O1xuY29uc3QgdGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd0YWJsZScpO1xuY29uc3QgYWRkQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZCcpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xuY29uc3Qgc3RvcmFnZSA9IG5ldyBMb2NhbFN0b3JhZ2UoKTtcbmNvbnN0IHZlY2hpY2xlcyA9IG5ldyBDb2xsZWN0aW9ucyhzdG9yYWdlLCAndmVoaWNsZXMnKTtcbmNvbnN0IGNhclNlcnZpY2UgPSBuZXcgQ2FyU2VydmljZSh2ZWNoaWNsZXMpO1xuY29uc3QgdGFibGVNYW5hZ2VyID0gbmV3IFRhYmxlKHRhYmxlLCBjcmVhdGVUYWJsZVJvdywgaWRlbnRpZnlDYXIpO1xuY29uc3QgYWRkRm9ybSA9IG5ldyBFZGl0b3IoZm9ybSwgb25TdWJtaXQuYmluZChudWxsLCB0YWJsZU1hbmFnZXIpLCBbJ21ha2UnLCAnbW9kZWwnLCAnYm9keVR5cGUnLCAnbnVtYmVyT2ZTZWF0cycsICd0cmFuc21pc3Npb24nLCAncmVudGFsUHJpY2UnLCAndHlwZSddKTtcbmNvbnN0IGZvcm1FRGl0ID0gbmV3IEVkaXRvcihlZGl0Rm9ybSwgb25FZGl0LmJpbmQobnVsbCwgdGFibGVNYW5hZ2VyKSwgWydpZCcsICdtYWtlJywgJ21vZGVsJywgJ2JvZHlUeXBlJywgJ251bWJlck9mU2VhdHMnLCAndHJhbnNtaXNzaW9uJywgJ3JlbnRhbFByaWNlJ10pO1xuZm9ybUVEaXQucmVtb3ZlKCk7XG5hZGRGb3JtLnJlbW92ZSgpO1xudGFibGVNYW5hZ2VyLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvblRhYmxlQ2xpY2spO1xuXG5hZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQ6IFN1Ym1pdEV2ZW50KSA9PiB7XG5cbiAgICBcblxuICAgIGFkZEZvcm0uYXR0YWNoVG8oc2VjdGlvbiwgJ0FkZCBDYXInLCBzZWN0aW9uKVxufSk7XG5cbmh5ZHJhdGUodGFibGVNYW5hZ2VyKTtcblxuXG5hc3luYyBmdW5jdGlvbiBoeWRyYXRlKHRhYmxlTWFuYWdlcjogVGFibGUpIHtcbiAgICBpZiAobG9jYWxTdG9yYWdlLmxlbmd0aCAhPSAwKSB7XG4gICAgICAgIGNvbnN0IGNhcnMgPSBhd2FpdCBjYXJTZXJ2aWNlLmZpbHRlcignbnVtYmVyT2ZTZWF0cycpO1xuICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGNhcnMpIHtcbiAgICAgICAgICAgIHRhYmxlTWFuYWdlci5hZGQoaXRlbSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuXG5hc3luYyBmdW5jdGlvbiBvblRhYmxlQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBcbiAgICBpZiAoZXZlbnQudGFyZ2V0IGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpIHtcblxuICAgICAgICBjb25zdCBpZCA9IGV2ZW50LnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuaWQ7XG5cbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5pZCA9PSAnZWRpdCcpIHtcblxuICAgICAgICAgICAgZm9ybUVEaXQuYXR0YWNoVG8oc2VjdGlvbiwgJ0VkaXQgQ2FyJywgc2VjdGlvbik7XG4gICAgICAgICAgICBjb25zdCByZWNvcmQgPSB0YWJsZU1hbmFnZXIuZ2V0KGlkKTtcbiAgICAgICAgICAgIGZvcm1FRGl0LnNldFZhbHVlcyhyZWNvcmQpO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGF3YWl0IGNhclNlcnZpY2UuZGVsZXRlKGlkKTtcbiAgICAgICAgICAgIGxldCByb3cgPSB0YWJsZU1hbmFnZXIuZ2V0Um93KGlkKTtcbiAgICAgICAgICAgIHJvdy5yZW1vdmUoKTtcbiAgICAgICAgICAgXG5cblxuXG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuZnVuY3Rpb24gY3JlYXRlVGFibGVSb3coY2FyOiBDYXJzKSB7XG4gICAgY29uc3Qgcm93ID0gdHIoeyBjYXJJZDogY2FyLmlkLCBpZDogY2FyLmlkIH0sXG4gICAgICAgIHRkKHt9LCBjYXIuaWQsKSxcbiAgICAgICAgdGQoe30sIGNhci5tYWtlKSxcbiAgICAgICAgdGQoe30sIGNhci5tb2RlbCksXG4gICAgICAgIHRkKHt9LCBjYXIuYm9keVR5cGUpLFxuICAgICAgICB0ZCh7fSwgY2FyLm51bWJlck9mU2VhdHMudG9TdHJpbmcoKSksXG4gICAgICAgIHRkKHt9LCBjYXIudHJhbnNtaXNzaW9uKSxcbiAgICAgICAgdGQoe30sIGAkJHtjYXIucmVudGFsUHJpY2V9L2RheWApLFxuICAgICAgICB0ZCh7fSwgYnV0dG9uKHsgY2xhc3NOYW1lOiAnYWN0aW9uJywgaWQ6ICdlZGl0JyB9LCAnRWRpdCcpLCBidXR0b24oeyBjbGFzc05hbWU6ICdhY3Rpb24nLCBpZDogJ2NhbmNlbCcgfSwgJ0RlbGV0ZScpKVxuICAgIClcblxuICAgIHJldHVybiByb3c7XG59XG5cbmZ1bmN0aW9uIGlkZW50aWZ5Q2FyKGNhcnM6IENhcnNbXSwgaWQ6IHN0cmluZykge1xuICAgIHJldHVybiBjYXJzLmZpbmQoZSA9PiBlLmlkID09IGlkKTtcbn1cblxuXG5hc3luYyBmdW5jdGlvbiBvblN1Ym1pdCh0YWJsZU1hbmFnZXI6IFRhYmxlLCB7IG1ha2UsIG1vZGVsLCBib2R5VHlwZSwgbnVtYmVyT2ZTZWF0cywgdHJhbnNtaXNzaW9uLCByZW50YWxQcmljZSB9KSB7XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjYXJTZXJ2aWNlLmNyZWF0ZSh7XG4gICAgICAgIG1ha2UsXG4gICAgICAgIG1vZGVsLFxuICAgICAgICBib2R5VHlwZSxcbiAgICAgICAgbnVtYmVyT2ZTZWF0cyxcbiAgICAgICAgdHJhbnNtaXNzaW9uLFxuICAgICAgICByZW50YWxQcmljZSxcbiAgICAgICAgdHlwZTogJ2NhcicsXG4gICAgICAgIHN0YXR1czogJ0F2YWlsYWJsZSdcbiAgICB9KTtcblxuICAgIHRhYmxlTWFuYWdlci5hZGQocmVzdWx0KTtcbiAgICBhZGRGb3JtLmNsZWFyKClcbiAgICBhZGRGb3JtLnJlbW92ZSgpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBvbkVkaXQodGFibGVNYW5hZ2VyOiBUYWJsZSwgeyBpZCwgbWFrZSwgbW9kZWwsIGJvZHlUeXBlLCBudW1iZXJPZlNlYXRzLCB0cmFuc21pc3Npb24sIHJlbnRhbFByaWNlIH0pIHtcblxuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2FyU2VydmljZS51cGRhdGUoaWQsIHsgbWFrZSwgbW9kZWwsIGJvZHlUeXBlLCBudW1iZXJPZlNlYXRzLCB0cmFuc21pc3Npb24sIHJlbnRhbFByaWNlIH0pO1xuICAgIHRhYmxlTWFuYWdlci5yZXBsYWNlKGlkLCByZXN1bHQpO1xuICAgIGZvcm1FRGl0LmNsZWFyKCk7XG4gICAgZm9ybUVEaXQucmVtb3ZlKCk7XG5cbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=