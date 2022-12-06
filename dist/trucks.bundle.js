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

/***/ "./src/models/Truck.ts":
/*!*****************************!*\
  !*** ./src/models/Truck.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Truck": () => (/* binding */ Truck)
/* harmony export */ });
/* harmony import */ var _Vechicle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vechicle */ "./src/models/Vechicle.ts");

class Truck extends _Vechicle__WEBPACK_IMPORTED_MODULE_0__.Vechicle {
    type;
    cargoType;
    capacity;
    constructor(id, make, model, cargoType, capacity, rentalPrice) {
        super();
        this.id = id,
            this.make = make,
            this.model = model,
            this.cargoType = cargoType,
            this.capacity = capacity,
            this.rentalPrice = rentalPrice;
    }
}
//  For `Truck`:
//  - `cargoType`: one of **box**, **flatbed** or **van**
//  - `capacity`: number


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


/***/ }),

/***/ "./src/services/TruckService.ts":
/*!**************************************!*\
  !*** ./src/services/TruckService.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TruckService": () => (/* binding */ TruckService)
/* harmony export */ });
/* harmony import */ var _models_Truck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/Truck */ "./src/models/Truck.ts");
/* harmony import */ var _Service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Service */ "./src/services/Service.ts");


class TruckService extends _Service__WEBPACK_IMPORTED_MODULE_1__.DataService {
    parseRecord(record) {
        const data = record;
        const result = new _models_Truck__WEBPACK_IMPORTED_MODULE_0__.Truck(data.id, data.make, data.model, data.cargoType, data.capacity, data.rentalPrice);
        return result;
    }
    validate(data) {
        throw new Error("Method not implemented.");
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
/*!***********************!*\
  !*** ./src/trucks.ts ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom/dom */ "./src/dom/dom.ts");
/* harmony import */ var _dom_Editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom/Editor */ "./src/dom/Editor.ts");
/* harmony import */ var _dom_Table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom/Table */ "./src/dom/Table.ts");
/* harmony import */ var _services_Collection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/Collection */ "./src/services/Collection.ts");
/* harmony import */ var _services_Storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/Storage */ "./src/services/Storage.ts");
/* harmony import */ var _services_TruckService__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/TruckService */ "./src/services/TruckService.ts");






console.log('trucks');
const section = document.querySelector('#formContainer');
const form = document.getElementById('add-form');
const editForm = document.getElementById('edit-form');
const table = document.querySelector('table');
const addBtn = document.querySelector('#addTruck');
const storage = new _services_Storage__WEBPACK_IMPORTED_MODULE_4__.LocalStorage();
const vechicles = new _services_Collection__WEBPACK_IMPORTED_MODULE_3__.Collections(storage, 'vehicles');
const truckService = new _services_TruckService__WEBPACK_IMPORTED_MODULE_5__.TruckService(vechicles);
const tableManager = new _dom_Table__WEBPACK_IMPORTED_MODULE_2__.Table(table, createTableRow, identifyCar);
const addForm = new _dom_Editor__WEBPACK_IMPORTED_MODULE_1__.Editor(form, onSubmit.bind(null, tableManager), ['make', 'model', 'cargoType', 'capacity', 'rentalPrice']);
const formEDit = new _dom_Editor__WEBPACK_IMPORTED_MODULE_1__.Editor(editForm, onEdit.bind(null, tableManager), ['id', 'make', 'model', 'cargoType', 'capacity', 'rentalPrice']);
formEDit.remove();
addForm.remove();
tableManager.element.addEventListener('click', onTableClick);
addBtn.addEventListener('click', (event) => {
    addForm.attachTo(section, 'Add Truck', section);
});
hydrate(tableManager);
async function hydrate(tableManager) {
    if (localStorage.length != 0) {
        const trucks = await truckService.filter('capacity');
        for (let item of trucks) {
            tableManager.add(item);
        }
    }
}
async function onTableClick(event) {
    if (event.target instanceof HTMLButtonElement) {
        const id = event.target.parentElement.parentElement.id;
        if (event.target.id == 'edit') {
            formEDit.attachTo(section, 'Edit Truck', section);
            const record = tableManager.get(id);
            formEDit.setValues(record);
        }
        else {
            await truckService.delete(id);
            let row = tableManager.getRow(id);
            row.remove();
        }
    }
}
function createTableRow(truck) {
    const row = (0,_dom_dom__WEBPACK_IMPORTED_MODULE_0__.tr)({ truckId: truck.id, id: truck.id }, (0,_dom_dom__WEBPACK_IMPORTED_MODULE_0__.td)({}, truck.id), (0,_dom_dom__WEBPACK_IMPORTED_MODULE_0__.td)({}, truck.make), (0,_dom_dom__WEBPACK_IMPORTED_MODULE_0__.td)({}, truck.model), (0,_dom_dom__WEBPACK_IMPORTED_MODULE_0__.td)({}, truck.cargoType), (0,_dom_dom__WEBPACK_IMPORTED_MODULE_0__.td)({}, `${truck.capacity}tons`), (0,_dom_dom__WEBPACK_IMPORTED_MODULE_0__.td)({}, `$${truck.rentalPrice}/day`), (0,_dom_dom__WEBPACK_IMPORTED_MODULE_0__.td)({}, (0,_dom_dom__WEBPACK_IMPORTED_MODULE_0__.button)({ className: 'action', id: 'edit' }, 'Edit'), (0,_dom_dom__WEBPACK_IMPORTED_MODULE_0__.button)({ className: 'action', id: 'cancel' }, 'Delete')));
    return row;
}
function identifyCar(trucks, id) {
    return trucks.find(e => e.id == id);
}
async function onSubmit(tableManager, { make, model, cargoType, capacity, rentalPrice }) {
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
    addForm.clear();
    addForm.remove();
}
async function onEdit(tableManager, { id, make, model, cargoType, capacity, rentalPrice }) {
    console.log(id, make);
    const result = await truckService.update(id, { make, model, cargoType, capacity, rentalPrice });
    tableManager.replace(id, result);
    formEDit.clear();
    formEDit.remove();
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNyQyxJQUFJO1FBQ0osS0FBSztRQUNMLFNBQVM7UUFDVCxRQUFRO1FBQ1IsV0FBVztRQUNYLElBQUksRUFBRSxPQUFPO1FBQ2IsTUFBTSxFQUFFLFdBQVc7S0FDdEIsQ0FBQyxDQUFDO0lBRUgsWUFBWSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN6QixPQUFPLENBQUMsS0FBSyxFQUFFO0lBQ2YsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3JCLENBQUM7QUFFRCxLQUFLLFVBQVUsTUFBTSxDQUFDLFlBQW1CLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRTtJQUU1RixPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUM7SUFDckIsTUFBTSxNQUFNLEdBQUcsTUFBTSxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ2hHLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2pDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFdEIsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2ZsZWV0X21hbmFnZXIvLi9zcmMvZG9tL0VkaXRvci50cyIsIndlYnBhY2s6Ly9mbGVldF9tYW5hZ2VyLy4vc3JjL2RvbS9UYWJsZS50cyIsIndlYnBhY2s6Ly9mbGVldF9tYW5hZ2VyLy4vc3JjL2RvbS9kb20udHMiLCJ3ZWJwYWNrOi8vZmxlZXRfbWFuYWdlci8uL3NyYy9tb2RlbHMvVHJ1Y2sudHMiLCJ3ZWJwYWNrOi8vZmxlZXRfbWFuYWdlci8uL3NyYy9tb2RlbHMvVmVjaGljbGUudHMiLCJ3ZWJwYWNrOi8vZmxlZXRfbWFuYWdlci8uL3NyYy9tb2RlbHMvdXRpbC50cyIsIndlYnBhY2s6Ly9mbGVldF9tYW5hZ2VyLy4vc3JjL3NlcnZpY2VzL0NvbGxlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vZmxlZXRfbWFuYWdlci8uL3NyYy9zZXJ2aWNlcy9TZXJ2aWNlLnRzIiwid2VicGFjazovL2ZsZWV0X21hbmFnZXIvLi9zcmMvc2VydmljZXMvU3RvcmFnZS50cyIsIndlYnBhY2s6Ly9mbGVldF9tYW5hZ2VyLy4vc3JjL3NlcnZpY2VzL1RydWNrU2VydmljZS50cyIsIndlYnBhY2s6Ly9mbGVldF9tYW5hZ2VyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2ZsZWV0X21hbmFnZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2ZsZWV0X21hbmFnZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9mbGVldF9tYW5hZ2VyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZmxlZXRfbWFuYWdlci8uL3NyYy90cnVja3MudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdGggfSBmcm9tIFwiLi9kb21cIjtcblxuZXhwb3J0IGNsYXNzIEVkaXRvciB7XG4gICAgcHJpdmF0ZSBuYW1lOiBIVE1MSGVhZGluZ0VsZW1lbnRcbiAgICBwcml2YXRlIHNlY3Rpb246IEhUTUxFbGVtZW50XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZm9ybTogSFRNTEZvcm1FbGVtZW50LFxuICAgICAgICBwcml2YXRlIGNhbGxiYWNrOiAoZGF0YTogb2JqZWN0KSA9PiBhbnksXG4gICAgICAgIHByaXZhdGUgcHJvcE5hbWVzOiBzdHJpbmdbXSxcblxuXG4gICAgKSB7XG4gICAgICAgIHRoaXMuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLm9uU3VibWl0LmJpbmQodGhpcykpO1xuXG4gICAgfVxuICAgIGNyZWF0ZSgpIHtcblxuICAgICAgICB0aGlzLnNlY3Rpb24uc3R5bGUuZGlzcGxheSA9ICdibG9jaydcbiAgICAgICAgdGhpcy5uYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICB9XG4gICAgc2V0VmFsdWUobmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZm9ybS5xdWVyeVNlbGVjdG9yKGBbbmFtZT1cIiR7bmFtZX1cIl1gKTtcblxuXG4gICAgICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAodGFyZ2V0LnR5cGUgPT0gJ2NoZWNrYm94Jykge1xuICAgICAgICAgICAgICAgIHRhcmdldC5jaGVja2VkID0gdmFsdWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRhcmdldC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRhcmdldCBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50IHx8IHRhcmdldCBpbnN0YW5jZW9mIEhUTUxUZXh0QXJlYUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRhcmdldC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0VmFsdWVzKGRhdGE6IG9iamVjdCkge1xuICAgICAgICBmb3IgKGxldCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoZGF0YSkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUoa2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhcigpIHtcblxuICAgICAgICB0aGlzLm5hbWUudGV4dENvbnRlbnQgPSAnJztcblxuICAgICAgICB0aGlzLmZvcm0ucmVzZXQoKTtcbiAgICB9XG5cbiAgICByZW1vdmUoKSB7XG5cbiAgICAgICAgdGhpcy5mb3JtLnJlbW92ZSgpO1xuXG5cbiAgICB9XG5cbiAgICBhdHRhY2hUbyhwYXJlbnQ6IE5vZGUsIG5hbWU6IHN0cmluZywgc2VjdGlvbjogSFRNTEVsZW1lbnQpIHtcblxuICAgICAgICB0aGlzLnNlY3Rpb24gPSBzZWN0aW9uO1xuICAgICAgICB0aGlzLmNyZWF0ZSgpO1xuICAgICAgICB0aGlzLm5hbWUudGV4dENvbnRlbnQgPSBuYW1lO1xuICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5uYW1lKTtcbiAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKHRoaXMuZm9ybSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblN1Ym1pdChldmVudDogU3VibWl0RXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKGV2ZW50LnN1Ym1pdHRlci5pZCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnN1Ym1pdHRlci5pZCAhPSAnY2FuY2VsJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKHRoaXMuZm9ybSk7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IE9iamVjdC5mcm9tRW50cmllcyh0aGlzLnByb3BOYW1lcy5tYXAobiA9PiBbbiwgZm9ybURhdGEuZ2V0KG4pXSkpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2soZGF0YSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKHRoaXMuZm9ybSk7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gT2JqZWN0LmZyb21FbnRyaWVzKHRoaXMucHJvcE5hbWVzLm1hcChuID0+IFtuLCBmb3JtRGF0YS5nZXQobildKSk7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrKGRhdGEpO1xuICAgICAgICB9XG5cbiAgICB9XG59IiwiXG5cbmV4cG9ydCBjbGFzcyBUYWJsZSB7XG5cbiAgICBwcml2YXRlIHJlY29yZHM6IGFueVtdID0gW107XG4gICAgcHJpdmF0ZSByb3dzOiBNYXA8b2JqZWN0LCBIVE1MVGFibGVSb3dFbGVtZW50PiA9IG5ldyBNYXAoKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZWxlbWVudDogSFRNTFRhYmxlRWxlbWVudCxcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVSb3c6IChyZWNvcmQ6IGFueSkgPT4gSFRNTFRhYmxlUm93RWxlbWVudCxcbiAgICAgICAgcHJpdmF0ZSBpZGVudGlmeT86IChyZWNvcmRzOiBhbnlbXSwgaWQ6IGFueSkgPT4gYW55LFxuXG4gICAgICAgIHJlY29yZHM/OiBhbnlbXVxuICAgICkge1xuICAgICAgICBpZiAocmVjb3Jkcykge1xuICAgICAgICAgICAgdGhpcy5yZWNvcmRzID0gcmVjb3JkcztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlY29yZHMuZm9yRWFjaCh0aGlzLmFkZC5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBhZGQocmVjb3JkOiBhbnkpIHtcbiAgICAgICAgY29uc3Qgcm93ID0gdGhpcy5jcmVhdGVSb3cocmVjb3JkKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHJvdyk7XG4gICAgICAgIHRoaXMucmVjb3Jkcy5wdXNoKHJlY29yZCk7XG4gICAgICAgIHRoaXMucm93cy5zZXQocmVjb3JkLCByb3cpO1xuICAgIH1cblxuICAgIGdldChpZDogYW55KTogYW55IHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmlkZW50aWZ5ID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuaWRlbnRpZnkodGhpcy5yZWNvcmRzLCBpZCk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcignSW5kZXRpdHkgZnVuY3Rpb24gbm90IHNwZWNpZmllZCcpO1xuICAgIH1cblxuICAgIGdldFJvdyhpZDogYW55KTogSFRNTFRhYmxlUm93RWxlbWVudCB7XG4gICAgICAgIGNvbnN0IHJlY29yZCA9IHRoaXMuZ2V0KGlkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucm93cy5nZXQocmVjb3JkKTtcbiAgICB9XG5cbiAgICByZW1vdmUoaWQ6IGFueSkge1xuXG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmdldChpZCk7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5yZWNvcmRzLmZpbmRJbmRleChkID0+IGQgPT0gZGF0YSk7XG4gICAgICAgIGNvbnN0IHJvdyA9IHRoaXMuZ2V0Um93KGlkKTtcblxuICAgICAgICByb3cucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMucm93cy5kZWxldGUoZGF0YSk7XG5cbiAgICAgICAgLy8gVXBkYXRlIHJlY29yZCBpbiBjb2xsZWN0aW9uXG4gICAgICAgIHRoaXMucmVjb3Jkcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cblxuICAgIHJlcGxhY2UoaWQ6IGFueSwgZGF0YTogYW55KSB7XG5cbiAgICAgICAgY29uc3QgcmVjb3JkID0gdGhpcy5nZXQoaWQpO1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMucmVjb3Jkcy5maW5kSW5kZXgociA9PiByID09IHJlY29yZCk7XG4gICAgICAgIGNvbnN0IHJvdyA9IHRoaXMuZ2V0Um93KGlkKTtcblxuICAgICAgICAvLyBVcGRhdGUgcm93IGluIERPTSBhbmQgY29sbGVjdGlvblxuICAgICAgICBjb25zdCBuZXdSb3cgPSB0aGlzLmNyZWF0ZVJvdyhkYXRhKTtcbiAgICAgICAgcm93LnJlcGxhY2VXaXRoKG5ld1Jvdyk7XG4gICAgICAgIHRoaXMucm93cy5zZXQocmVjb3JkLCBuZXdSb3cpO1xuXG4gICAgICAgIC8vIFVwZGF0ZSByZWNvcmQgaW4gY29sbGVjdGlvblxuICAgICAgICB0aGlzLnJlY29yZHMuc3BsaWNlKGluZGV4LCAxLCBkYXRhKTtcblxuICAgIH1cbiAgICBjbGVhcigpe1xuICAgICBcbiAgICAgICAgZm9yKGxldCByb3cgb2YgKHRoaXMucm93cykpe1xuICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlcyA9IE9iamVjdC5lbnRyaWVzKHJvd1swXSlcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2codGhpcy5yb3dzKTtcbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0Um93KHZhbHVlc1swXVsxXSkpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ2V0Um93KHZhbHVlc1swXVsxXSkpXG4gICAgICAgICAgICAgICAgY29uc3Qgcm93ID0gdGhpcy5nZXRSb3codmFsdWVzWzBdWzFdKTtcbiAgICAgICAgICAgICAgICByb3cucmVtb3ZlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfVxufSIsInR5cGUgRG9tQ29udGVudCA9IHN0cmluZyB8IE5vZGU7XG5cbnR5cGUgZWxlbWVudEZhY3Rvcnk8VCBleHRlbmRzIEhUTUxFbGVtZW50PiA9IChwcm9wcz86IG9iamVjdCwgLi4uY29udGVudDogRG9tQ29udGVudFtdKSA9PiBUO1xuXG5leHBvcnQgZnVuY3Rpb24gZG9tKHR5cGU6IHN0cmluZywgcHJvcHM/OiBvYmplY3QsIC4uLmNvbnRlbnQ6IERvbUNvbnRlbnRbXSkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpO1xuXG4gICAgaWYgKHByb3BzKSB7XG4gICAgICAgIGZvciAobGV0IHByb3BOYW1lIGluIHByb3BzKSB7XG4gICAgICAgICAgICBpZiAocHJvcE5hbWUuc3RhcnRzV2l0aCgnb24nKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGV2ZW50TmFtZSA9IHByb3BOYW1lLnNsaWNlKDIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgcHJvcHNbcHJvcE5hbWVdKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcE5hbWUuc3RhcnRzV2l0aCgnZGF0YScpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YU5hbWUgPSBwcm9wTmFtZS5zbGljZSg0LDUpLnRvTG93ZXJDYXNlKCkgKyBwcm9wTmFtZS5zbGljZSg1KTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmRhdGFzZXRbZGF0YU5hbWVdID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50W3Byb3BOYW1lXSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGl0ZW0gb2YgY29udGVudCkge1xuICAgICAgICBlbGVtZW50LmFwcGVuZChpdGVtKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbn1cblxuZXhwb3J0IGNvbnN0IHRhYmxlOiBlbGVtZW50RmFjdG9yeTxIVE1MVGFibGVFbGVtZW50PiA9IGRvbS5iaW5kKG51bGwsICd0YWJsZScpO1xuZXhwb3J0IGNvbnN0IHRoZWFkOiBlbGVtZW50RmFjdG9yeTxIVE1MVGFibGVTZWN0aW9uRWxlbWVudD4gPSBkb20uYmluZChudWxsLCAndGhlYWQnKTtcbmV4cG9ydCBjb25zdCB0Ym9keTogZWxlbWVudEZhY3Rvcnk8SFRNTFRhYmxlU2VjdGlvbkVsZW1lbnQ+ID0gZG9tLmJpbmQobnVsbCwgJ3Rib2R5Jyk7XG5leHBvcnQgY29uc3QgdHI6IGVsZW1lbnRGYWN0b3J5PEhUTUxUYWJsZVJvd0VsZW1lbnQ+ID0gZG9tLmJpbmQobnVsbCwgJ3RyJyk7XG5leHBvcnQgY29uc3QgdGg6IGVsZW1lbnRGYWN0b3J5PEhUTUxUYWJsZUNlbGxFbGVtZW50PiA9IGRvbS5iaW5kKG51bGwsICd0aCcpO1xuZXhwb3J0IGNvbnN0IHRkOiBlbGVtZW50RmFjdG9yeTxIVE1MVGFibGVDZWxsRWxlbWVudD4gPSBkb20uYmluZChudWxsLCAndGQnKTtcbmV4cG9ydCBjb25zdCBidXR0b246IGVsZW1lbnRGYWN0b3J5PEhUTUxCdXR0b25FbGVtZW50PiA9IGRvbS5iaW5kKG51bGwsICdidXR0b24nKTtcbmV4cG9ydCBjb25zdCBhOiBlbGVtZW50RmFjdG9yeTxIVE1MQW5jaG9yRWxlbWVudD4gPSBkb20uYmluZChudWxsLCAnYScpO1xuIiwiaW1wb3J0IHsgQ2FyZ28gfSBmcm9tIFwiLi91dGlsXCI7XG5pbXBvcnQgeyBWZWNoaWNsZSB9IGZyb20gXCIuL1ZlY2hpY2xlXCI7XG5cblxuXG5leHBvcnQgY2xhc3MgVHJ1Y2sgZXh0ZW5kcyBWZWNoaWNsZSB7XG50eXBlOiAndHJ1Y2snICBcbmNhcmdvVHlwZTogQ2FyZ29cbmNhcGFjaXR5OiBudW1iZXJcblxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGlkOiBzdHJpbmcsXG4gICAgICAgIG1ha2U6IHN0cmluZyxcbiAgICAgICAgbW9kZWw6IHN0cmluZyxcbiAgICAgICAgY2FyZ29UeXBlOiBDYXJnbyxcbiAgICAgICAgY2FwYWNpdHk6IG51bWJlcixcbiAgICAgICAgcmVudGFsUHJpY2U6IG51bWJlclxuICAgICkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmlkID0gaWQsXG4gICAgICAgIHRoaXMubWFrZSA9IG1ha2UsXG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbCxcbiAgICAgICAgdGhpcy5jYXJnb1R5cGUgPSBjYXJnb1R5cGUsXG4gICAgICAgIHRoaXMuY2FwYWNpdHkgPSBjYXBhY2l0eSxcbiAgICAgICAgdGhpcy5yZW50YWxQcmljZSA9IHJlbnRhbFByaWNlXG5cbiAgICB9XG59XG5cbi8vICBGb3IgYFRydWNrYDpcbi8vICAtIGBjYXJnb1R5cGVgOiBvbmUgb2YgKipib3gqKiwgKipmbGF0YmVkKiogb3IgKip2YW4qKlxuLy8gIC0gYGNhcGFjaXR5YDogbnVtYmVyXG4iLCJpbXBvcnQgeyBSZWNvcmRJZCB9IGZyb20gXCIuLi9zZXJ2aWNlcy9TdG9yYWdlXCI7XG5pbXBvcnQgeyBUcnVjayB9IGZyb20gXCIuL1RydWNrXCI7XG5pbXBvcnQgeyBDYXJzLCBSZWNvcmQsIFJlbnRlZCwgVHJ1Y2tzIH0gZnJvbSBcIi4vdXRpbFwiO1xuXG5cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFZlY2hpY2xlIHtcbiAgICBpZDogUmVjb3JkSWRcbiAgICBtYWtlOiBzdHJpbmdcbiAgICBtb2RlbDogc3RyaW5nXG4gICAgcmVudGFsUHJpY2U6IG51bWJlclxuICAgIHJlbnRlZFRvPzogc3RyaW5nIHwgbnVsbFxufVxuLy8gQ3JlYXRlIGFic3RyYWN0IG1vZGVsIGBWZWhpY2xlYCB3aXRoIHByb3BlcnRpZXM6XG4vLyAtIGBpZGA6IHN0cmluZ1xuLy8gLSBgbWFrZWA6IHN0cmluZ1xuLy8gLSBgbW9kZWxgOiBzdHJpbmdcbi8vIC0gYHJlbnRhbFByaWNlYDogbnVtYmVyXG4vLyAtIGByZW50ZWRUb2A6IHN0cmluZyBvciBudWxsXG5cblxuIiwiaW1wb3J0IHsgUmVjb3JkSWQgfSBmcm9tIFwiLi4vc2VydmljZXMvU3RvcmFnZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlY29yZCB7XG4gICAgdHlwZT86IHN0cmluZztcbiAgICBpZDogc3RyaW5nXG59XG5cbmV4cG9ydCB0eXBlIFJlbnRlZCA9IHN0cmluZyB8IG51bGw7XG5cbmV4cG9ydCB0eXBlIEJvZHlUeXBlID0gJ3NlZGFuJyB8ICdzdXYnIHwgJ2hhdGNoYmFjayc7XG5cblxuZXhwb3J0IHR5cGUgVHJhbnNtaXNzaW9uID0gJ21hbnVhbCcgfCAnYXV0b21hdGljJztcblxuZXhwb3J0IHR5cGUgQ2FyZ28gPSAnYm94JyB8ICdmbGF0YmVkJyB8ICd2YW4nO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVJZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiAnMDAwMC0wMDAwJy5yZXBsYWNlKC8wL2csICgpID0+IChNYXRoLnJhbmRvbSgpICogMTYgfCAwKS50b1N0cmluZygxNikpO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENhcnMgZXh0ZW5kcyBSZWNvcmR7XG5cbiAgICBpZDogUmVjb3JkSWQsXG4gICAgbWFrZTogc3RyaW5nLFxuICAgIG1vZGVsOiBzdHJpbmcsXG4gICAgYm9keVR5cGU6IEJvZHlUeXBlLFxuICAgIG51bWJlck9mU2VhdHM6IG51bWJlcixcbiAgICB0cmFuc21pc3Npb246IFRyYW5zbWlzc2lvbixcbiAgICByZW50YWxQcmljZTogbnVtYmVyXG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBUcnVja3MgZXh0ZW5kcyBSZWNvcmR7XG5cbiAgICBpZDogUmVjb3JkSWQsXG4gICAgbWFrZTogc3RyaW5nLFxuICAgIG1vZGVsOiBzdHJpbmcsXG4gICAgY2FyZ29UeXBlOiBDYXJnbyxcbiAgICBjYXBhY2l0eTogbnVtYmVyLFxuICAgIHJlbnRhbFByaWNlOiBudW1iZXJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBWZWNoaWNsZSB7XG4gICAgaWQ6IFJlY29yZElkXG4gICAgbWFrZTogc3RyaW5nXG4gICAgbW9kZWw6IHN0cmluZ1xuICAgIHJlbnRhbFByaWNlOiBudW1iZXJcbiAgICByZW50ZWRUbz86IHN0cmluZyB8IG51bGxcbiAgICBib2R5VFlwZT8gOiBzdHJpbmdcbiAgICBudW1iZXJPZlNlYXRzPzogbnVtYmVyXG4gICAgdHJhbnNtaXNzaW9uPyA6IHN0cmluZ1xuICAgIGNhcmdvVHlwZT86IG51bWJlclxuICAgIGNhcGFjaXR5PzogbnVtYmVyXG4gICAgXG5cbn0iLCJpbXBvcnQgeyBSZWNvcmQgfSBmcm9tIFwiLi4vbW9kZWxzL3V0aWxcIjtcbmltcG9ydCB7IFJlY29yZElkLCBTdG9yYWdlIH0gZnJvbSBcIi4vU3RvcmFnZVwiO1xuXG5cbmV4cG9ydCBjbGFzcyBDb2xsZWN0aW9ucyB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBzdG9yYWdlOiBTdG9yYWdlLFxuICAgICAgICBwcml2YXRlIG5hbWU6IHN0cmluZykgeyB9XG5cblxuXG5cbiAgICBnZXRBbGwoKTogUHJvbWlzZTxSZWNvcmRbXT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zdG9yYWdlLmdldEFsbCh0aGlzLm5hbWUpO1xuICAgIH1cblxuICAgIGdldEJ5SWQoaWQ6IFJlY29yZElkKTogUHJvbWlzZTxSZWNvcmQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5nZXRCeUlkKHRoaXMubmFtZSwgaWQpO1xuICAgIH1cblxuICAgIGNyZWF0ZShkYXRhOiBhbnkpOiBQcm9taXNlPFJlY29yZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zdG9yYWdlLmNyZWF0ZSh0aGlzLm5hbWUsIGRhdGEpO1xuICAgIH1cblxuICAgIHVwZGF0ZShpZDogUmVjb3JkSWQsIGRhdGE6IGFueSk6IFByb21pc2U8UmVjb3JkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2UudXBkYXRlKHRoaXMubmFtZSwgaWQsIGRhdGEpO1xuICAgIH1cblxuICAgIGRlbGV0ZShpZDogUmVjb3JkSWQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5kZWxldGUodGhpcy5uYW1lLCBpZCk7XG4gICAgfVxuICAgIGFzeW5jIGZpbHRlcihjcml0ZXJpYTogc3RyaW5nKTogUHJvbWlzZTxSZWNvcmRbXT4ge1xuICAgICAgICByZXR1cm4gICAoYXdhaXQgdGhpcy5nZXRBbGwoKSkuZmlsdGVyKG9iaiA9PiBvYmouaGFzT3duUHJvcGVydHkoY3JpdGVyaWEpKTtcbiAgICAgICBcbiAgICAgICAgXG4gICAgICAgfVxufSIsImltcG9ydCB7IFJlY29yZCB9IGZyb20gXCIuLi9tb2RlbHMvdXRpbFwiO1xuaW1wb3J0IHsgQ29sbGVjdGlvbnMgfSBmcm9tIFwiLi9Db2xsZWN0aW9uXCI7XG5cblxuZXhwb3J0IGludGVyZmFjZSBTZXJ2aWNlPFQ+IHtcblxuXG4gICAgZ2V0QWxsKCk6IFByb21pc2U8VFtdPjtcbiAgICBnZXRCeUlkKGlkOiBzdHJpbmcpOiBQcm9taXNlPFQ+O1xuICAgIGNyZWF0ZShkYXRhKTogUHJvbWlzZTxUPjtcbiAgICB1cGRhdGUoaWQ6IGFueSwgZGF0YTogYW55KTogUHJvbWlzZTxUPlxuICAgIGRlbGV0ZShpZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPlxuXG59XG5cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIERhdGFTZXJ2aWNlPFQ+IGltcGxlbWVudHMgU2VydmljZTxUPntcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGNvbGxlY3Rpb246IENvbGxlY3Rpb25zXG4gICAgKSB7IH1cbiAgICBhc3luYyBnZXRBbGwoKTogUHJvbWlzZTxUW10+IHtcbiAgICAgICAgY29uc3QgcmVjb3JkcyA9IChhd2FpdCB0aGlzLmNvbGxlY3Rpb24uZ2V0QWxsKCkpLm1hcChyID0+IHRoaXMucGFyc2VSZWNvcmQocikpO1xuXG4gICAgICAgIHJldHVybiByZWNvcmRzO1xuICAgIH1cbiAgICBhc3luYyBnZXRCeUlkKGlkOiBzdHJpbmcpOiBQcm9taXNlPFQ+IHtcbiAgICAgICAgY29uc3QgcmVjb3JkID0gYXdhaXQgdGhpcy5jb2xsZWN0aW9uLmdldEJ5SWQoaWQpO1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJzZVJlY29yZChyZWNvcmQpO1xuICAgIH1cbiAgICBhc3luYyBjcmVhdGUoZGF0YTogYW55KTogUHJvbWlzZTxUPiB7XG4gICAgICAgIC8vIHRoaXMudmFsaWRhdGUoZGF0YSk7XG4gICAgICAgIGNvbnN0IHJlY29yZCA9IGF3YWl0IHRoaXMuY29sbGVjdGlvbi5jcmVhdGUoZGF0YSk7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlUmVjb3JkKHJlY29yZCk7XG4gICAgfVxuICAgIGFzeW5jIHVwZGF0ZShpZDogYW55LCBkYXRhOiBhbnkpOiBQcm9taXNlPFQ+IHtcbiAgICAgICAgLy90aGlzLnZhbGlkYXRlKGRhdGEpO1xuICAgICAgICBjb25zdCByZWNvcmQgPSBhd2FpdCB0aGlzLmNvbGxlY3Rpb24udXBkYXRlKGlkLCBkYXRhKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VSZWNvcmQocmVjb3JkKTtcbiAgICB9XG4gICAgYXN5bmMgZGVsZXRlKGlkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sbGVjdGlvbi5kZWxldGUoaWQpO1xuICAgIH1cblxuICAgIGFzeW5jIGZpbHRlcihjcml0ZXJpYTogc3RyaW5nKSB7XG5cblxuICAgICAgICBsZXQgcmVzdWx0XG4gICAgICAgIGlmIChjcml0ZXJpYS5lbmRzV2l0aCgncycpKSB7XG4gICAgICAgICAgICByZXN1bHQgPSAoYXdhaXQgdGhpcy5jb2xsZWN0aW9uLmdldEFsbCgpKS5maWx0ZXIob2JqID0+IG9iai50eXBlID09PSBjcml0ZXJpYS5zdWJzdHJpbmcoMCwgY3JpdGVyaWEubGVuZ3RoLTEpKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coY3JpdGVyaWEuc3Vic3RyaW5nKDAsIGNyaXRlcmlhLmxlbmd0aC0xKSlcbiAgICAgICAgfWVsc2UgaWYgKGNyaXRlcmlhLmluY2x1ZGVzKCcwJykpe1xuICAgICAgICAgICAgcmVzdWx0ID0gKGF3YWl0IHRoaXMuY29sbGVjdGlvbi5nZXRBbGwoKSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXN1bHQgPSAoYXdhaXQgdGhpcy5jb2xsZWN0aW9uLmdldEFsbCgpKS5maWx0ZXIob2JqID0+IG9iai5oYXNPd25Qcm9wZXJ0eShjcml0ZXJpYSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRcbiAgICB9XG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IHBhcnNlUmVjb3JkKHJlY29yZDogUmVjb3JkKTogVFxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCB2YWxpZGF0ZShkYXRhOiBhbnkpOiB2b2lkXG59XG4iLCJpbXBvcnQgeyBnZW5lcmF0ZUlkIH0gZnJvbSBcIi4uL21vZGVscy91dGlsXCI7XG5cblxuXG5leHBvcnQgdHlwZSBSZWNvcmRJZCA9IHN0cmluZztcblxuZXhwb3J0IHR5cGUgUmVjb3JkID0ge1xuICAgIGlkOiBSZWNvcmRJZDtcbn1cblxuXG5leHBvcnQgIGludGVyZmFjZSBTdG9yYWdlIHtcbiAgICBnZXRBbGwoY29sbGVjdGlvbk5hbWU6IHN0cmluZyk6IFByb21pc2U8UmVjb3JkW10+O1xuICAgIGdldEJ5SWQoY29sbGVjdGlvbk5hbWU6IHN0cmluZywgaWQ6IFJlY29yZElkKTogUHJvbWlzZTxSZWNvcmQ+O1xuICAgIGNyZWF0ZShjb2xsZWN0aW9uTmFtZTogc3RyaW5nLCBkYXRhOiBhbnkpOiBQcm9taXNlPFJlY29yZD47XG4gICAgdXBkYXRlKGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcsIGlkOiBSZWNvcmRJZCwgZGF0YTogYW55KTogUHJvbWlzZTxSZWNvcmQ+O1xuICAgIGRlbGV0ZShjb2xsZWN0aW9uTmFtZTogc3RyaW5nLCBpZDogUmVjb3JkSWQpOiBQcm9taXNlPHZvaWQ+O1xufVxuXG5cbmV4cG9ydCBjbGFzcyBMb2NhbFN0b3JhZ2UgaW1wbGVtZW50cyBTdG9yYWdlIHtcbiAgICBnZXRBbGwoY29sbGVjdGlvbk5hbWU6IHN0cmluZyk6IFByb21pc2U8UmVjb3JkW10+IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oY29sbGVjdGlvbk5hbWUpIHx8IG51bGwpIHx8IFtdO1xuICAgIH1cbiAgICBhc3luYyBnZXRCeUlkKGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcsIGlkOiBzdHJpbmcpOiBQcm9taXNlPFJlY29yZD4ge1xuICAgICAgICBjb25zdCBpdGVtcyA9IGF3YWl0IHRoaXMuZ2V0QWxsKGNvbGxlY3Rpb25OYW1lKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gaXRlbXMuZmluZChpID0+IGkuaWQgPT0gaWQpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBhc3luYyBjcmVhdGUoY29sbGVjdGlvbk5hbWU6IHN0cmluZywgZGF0YTogYW55KTogUHJvbWlzZTxSZWNvcmQ+IHtcbiAgICAgICAgY29uc3QgaXRlbXMgPSBhd2FpdCB0aGlzLmdldEFsbChjb2xsZWN0aW9uTmFtZSk7XG4gICAgICAgIGNvbnN0IHJlY29yZCA9IE9iamVjdC5hc3NpZ24oe30sIGRhdGEsIHsgaWQ6IGdlbmVyYXRlSWQoKSB9KTtcbiAgICAgICAgaXRlbXMucHVzaChyZWNvcmQpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShjb2xsZWN0aW9uTmFtZSwgSlNPTi5zdHJpbmdpZnkoaXRlbXMpKTtcblxuICAgICAgICByZXR1cm4gcmVjb3JkO1xuICAgIH1cbiAgICBhc3luYyB1cGRhdGUoY29sbGVjdGlvbk5hbWU6IHN0cmluZywgaWQ6IHN0cmluZywgZGF0YTogYW55KTogUHJvbWlzZTxSZWNvcmQ+IHtcbiAgICAgICAgY29uc3QgaXRlbXMgPSBhd2FpdCB0aGlzLmdldEFsbChjb2xsZWN0aW9uTmFtZSk7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gaXRlbXMuZmluZEluZGV4KGkgPT4gaS5pZCA9PSBpZCk7XG4gICAgICAgIGlmIChpbmRleCA9PSAtMSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKGBSZWNvcmQgJHtpZH0gbm90IGZvdW5kIGluIFwiJHtjb2xsZWN0aW9uTmFtZX1cImApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlY29yZCA9IE9iamVjdC5hc3NpZ24oe30sIGRhdGEsIHsgaWQgfSk7XG4gICAgICAgIGl0ZW1zW2luZGV4XSA9IHJlY29yZDtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oY29sbGVjdGlvbk5hbWUsIEpTT04uc3RyaW5naWZ5KGl0ZW1zKSk7XG5cbiAgICAgICAgcmV0dXJuIHJlY29yZDtcbiAgICB9XG4gICAgYXN5bmMgZGVsZXRlKGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcsIGlkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3QgaXRlbXMgPSBhd2FpdCB0aGlzLmdldEFsbChjb2xsZWN0aW9uTmFtZSk7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gaXRlbXMuZmluZEluZGV4KGkgPT4gaS5pZCA9PSBpZCk7XG4gICAgICAgIGlmIChpbmRleCA9PSAtMSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKGBSZWNvcmQgJHtpZH0gbm90IGZvdW5kIGluIFwiJHtjb2xsZWN0aW9uTmFtZX1cImApO1xuICAgICAgICB9XG4gICAgICAgIGl0ZW1zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGNvbGxlY3Rpb25OYW1lLCBKU09OLnN0cmluZ2lmeShpdGVtcykpO1xuICAgIH1cblxufVxuXG5cbiIsImltcG9ydCB7IFRydWNrIH0gZnJvbSBcIi4uL21vZGVscy9UcnVja1wiO1xuaW1wb3J0IHsgQ2FyZ28sIFJlY29yZCwgVHJ1Y2tzIH0gZnJvbSBcIi4uL21vZGVscy91dGlsXCI7XG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gXCIuL1NlcnZpY2VcIjtcblxuXG5leHBvcnQgY2xhc3MgVHJ1Y2tTZXJ2aWNlIGV4dGVuZHMgRGF0YVNlcnZpY2U8VHJ1Y2s+ICB7XG4gICBcbiAgICBwcm90ZWN0ZWQgcGFyc2VSZWNvcmQocmVjb3JkOiBUcnVja3MpOiBUcnVjayB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSByZWNvcmQ7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBUcnVjayhcbiAgICAgICAgICAgIGRhdGEuaWQsXG4gICAgICAgICAgICBkYXRhLm1ha2UsXG4gICAgICAgICAgICBkYXRhLm1vZGVsLFxuICAgICAgICAgICAgZGF0YS5jYXJnb1R5cGUsXG4gICAgICAgICAgICBkYXRhLmNhcGFjaXR5LFxuICAgICAgICAgICAgZGF0YS5yZW50YWxQcmljZSxcblxuXG5cbiAgICAgICAgKVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgdmFsaWRhdGUoZGF0YTogYW55KTogdm9pZCB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1ldGhvZCBub3QgaW1wbGVtZW50ZWQuXCIpO1xuICAgIH1cblxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgYnV0dG9uLCB0ZCwgdHIgfSBmcm9tIFwiLi9kb20vZG9tXCI7XG5pbXBvcnQgeyBFZGl0b3IgfSBmcm9tIFwiLi9kb20vRWRpdG9yXCI7XG5pbXBvcnQgeyBUYWJsZSB9IGZyb20gXCIuL2RvbS9UYWJsZVwiO1xuaW1wb3J0IHsgQ2FycywgVHJ1Y2tzIH0gZnJvbSBcIi4vbW9kZWxzL3V0aWxcIjtcbmltcG9ydCB7IENhclNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9DYXJTZXJ2aWNlXCI7XG5pbXBvcnQgeyBDb2xsZWN0aW9ucyB9IGZyb20gXCIuL3NlcnZpY2VzL0NvbGxlY3Rpb25cIjtcbmltcG9ydCB7IExvY2FsU3RvcmFnZSB9IGZyb20gXCIuL3NlcnZpY2VzL1N0b3JhZ2VcIjtcbmltcG9ydCB7IFRydWNrU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL1RydWNrU2VydmljZVwiO1xuXG5jb25zb2xlLmxvZygndHJ1Y2tzJyk7XG5cblxuY29uc3Qgc2VjdGlvbjogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9ybUNvbnRhaW5lcicpO1xuY29uc3QgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtZm9ybScpIGFzIEhUTUxGb3JtRWxlbWVudDtcbmNvbnN0IGVkaXRGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VkaXQtZm9ybScpIGFzIEhUTUxGb3JtRWxlbWVudDtcbmNvbnN0IHRhYmxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigndGFibGUnKTtcbmNvbnN0IGFkZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGRUcnVjaycpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xuY29uc3Qgc3RvcmFnZSA9IG5ldyBMb2NhbFN0b3JhZ2UoKTtcbmNvbnN0IHZlY2hpY2xlcyA9IG5ldyBDb2xsZWN0aW9ucyhzdG9yYWdlLCAndmVoaWNsZXMnKVxuXG5jb25zdCB0cnVja1NlcnZpY2UgPSBuZXcgVHJ1Y2tTZXJ2aWNlKHZlY2hpY2xlcyk7XG5cbmNvbnN0IHRhYmxlTWFuYWdlciA9IG5ldyBUYWJsZSh0YWJsZSwgY3JlYXRlVGFibGVSb3csIGlkZW50aWZ5Q2FyKTtcbmNvbnN0IGFkZEZvcm0gPSBuZXcgRWRpdG9yKGZvcm0sIG9uU3VibWl0LmJpbmQobnVsbCwgdGFibGVNYW5hZ2VyKSwgWydtYWtlJywgJ21vZGVsJywgJ2NhcmdvVHlwZScsICdjYXBhY2l0eScsICdyZW50YWxQcmljZSddKTtcbmNvbnN0IGZvcm1FRGl0ID0gbmV3IEVkaXRvcihlZGl0Rm9ybSwgb25FZGl0LmJpbmQobnVsbCwgdGFibGVNYW5hZ2VyKSwgWydpZCcsICdtYWtlJywgJ21vZGVsJywgJ2NhcmdvVHlwZScsICdjYXBhY2l0eScsICdyZW50YWxQcmljZSddKTtcbmZvcm1FRGl0LnJlbW92ZSgpO1xuYWRkRm9ybS5yZW1vdmUoKTtcbnRhYmxlTWFuYWdlci5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25UYWJsZUNsaWNrKTtcblxuXG5hZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQ6IFN1Ym1pdEV2ZW50KSA9PiB7XG5cbiAgICBhZGRGb3JtLmF0dGFjaFRvKHNlY3Rpb24sICdBZGQgVHJ1Y2snLCBzZWN0aW9uKVxufSk7XG5cbmh5ZHJhdGUodGFibGVNYW5hZ2VyKTtcblxuXG5hc3luYyBmdW5jdGlvbiBoeWRyYXRlKHRhYmxlTWFuYWdlcjogVGFibGUpIHtcblxuICAgIGlmIChsb2NhbFN0b3JhZ2UubGVuZ3RoICE9IDApIHtcblxuICAgICAgICBjb25zdCB0cnVja3MgPSBhd2FpdCB0cnVja1NlcnZpY2UuZmlsdGVyKCdjYXBhY2l0eScpO1xuICBcbiAgICAgICAgZm9yIChsZXQgaXRlbSBvZiB0cnVja3MpIHtcbiAgICAgICAgICAgIHRhYmxlTWFuYWdlci5hZGQoaXRlbSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuXG5hc3luYyBmdW5jdGlvbiBvblRhYmxlQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcblxuICAgIGlmIChldmVudC50YXJnZXQgaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkge1xuXG4gICAgICAgIGNvbnN0IGlkID0gZXZlbnQudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5pZDtcblxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmlkID09ICdlZGl0Jykge1xuXG4gICAgICAgICAgICBmb3JtRURpdC5hdHRhY2hUbyhzZWN0aW9uLCAnRWRpdCBUcnVjaycsIHNlY3Rpb24pO1xuICAgICAgICAgICAgY29uc3QgcmVjb3JkID0gdGFibGVNYW5hZ2VyLmdldChpZCk7XG4gICAgICAgICAgICBmb3JtRURpdC5zZXRWYWx1ZXMocmVjb3JkKTtcbiAgICAgICAgfSBlbHNlIHtcblxuXG4gICAgICAgICAgICBhd2FpdCB0cnVja1NlcnZpY2UuZGVsZXRlKGlkKTtcbiAgICAgICAgICAgIGxldCByb3cgPSB0YWJsZU1hbmFnZXIuZ2V0Um93KGlkKTtcbiAgICAgICAgICAgIHJvdy5yZW1vdmUoKTtcblxuICAgICAgICB9XG4gICAgfVxufVxuXG5cbmZ1bmN0aW9uIGNyZWF0ZVRhYmxlUm93KHRydWNrOiBUcnVja3MpIHtcbiAgICBjb25zdCByb3cgPSB0cih7IHRydWNrSWQ6IHRydWNrLmlkLCBpZDogdHJ1Y2suaWQgfSxcbiAgICAgICAgdGQoe30sIHRydWNrLmlkLCksXG4gICAgICAgIHRkKHt9LCB0cnVjay5tYWtlKSxcbiAgICAgICAgdGQoe30sIHRydWNrLm1vZGVsKSxcbiAgICAgICAgdGQoe30sIHRydWNrLmNhcmdvVHlwZSksXG4gICAgICAgIHRkKHt9LCBgJHt0cnVjay5jYXBhY2l0eX10b25zYCksXG4gICAgICAgIHRkKHt9LCBgJCR7dHJ1Y2sucmVudGFsUHJpY2V9L2RheWApLFxuICAgICAgICB0ZCh7fSwgYnV0dG9uKHsgY2xhc3NOYW1lOiAnYWN0aW9uJywgaWQ6ICdlZGl0JyB9LCAnRWRpdCcpLCBidXR0b24oeyBjbGFzc05hbWU6ICdhY3Rpb24nLCBpZDogJ2NhbmNlbCcgfSwgJ0RlbGV0ZScpKVxuICAgIClcblxuICAgIHJldHVybiByb3c7XG59XG5cbmZ1bmN0aW9uIGlkZW50aWZ5Q2FyKHRydWNrczogVHJ1Y2tzW10sIGlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdHJ1Y2tzLmZpbmQoZSA9PiBlLmlkID09IGlkKTtcbn1cblxuXG5hc3luYyBmdW5jdGlvbiBvblN1Ym1pdCh0YWJsZU1hbmFnZXI6IFRhYmxlLCB7IG1ha2UsIG1vZGVsLCBjYXJnb1R5cGUsIGNhcGFjaXR5LCByZW50YWxQcmljZSB9KSB7XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0cnVja1NlcnZpY2UuY3JlYXRlKHtcbiAgICAgICAgbWFrZSxcbiAgICAgICAgbW9kZWwsXG4gICAgICAgIGNhcmdvVHlwZSxcbiAgICAgICAgY2FwYWNpdHksXG4gICAgICAgIHJlbnRhbFByaWNlLFxuICAgICAgICB0eXBlOiAndHJ1Y2snLFxuICAgICAgICBzdGF0dXM6ICdBdmFpbGFibGUnXG4gICAgfSk7XG5cbiAgICB0YWJsZU1hbmFnZXIuYWRkKHJlc3VsdCk7XG4gICAgYWRkRm9ybS5jbGVhcigpXG4gICAgYWRkRm9ybS5yZW1vdmUoKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gb25FZGl0KHRhYmxlTWFuYWdlcjogVGFibGUsIHsgaWQsIG1ha2UsIG1vZGVsLCBjYXJnb1R5cGUsIGNhcGFjaXR5LCByZW50YWxQcmljZSB9KSB7XG5cbiAgICBjb25zb2xlLmxvZyhpZCwgbWFrZSlcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0cnVja1NlcnZpY2UudXBkYXRlKGlkLCB7IG1ha2UsIG1vZGVsLCBjYXJnb1R5cGUsIGNhcGFjaXR5LCByZW50YWxQcmljZSB9KTtcbiAgICB0YWJsZU1hbmFnZXIucmVwbGFjZShpZCwgcmVzdWx0KTtcbiAgICBmb3JtRURpdC5jbGVhcigpO1xuICAgIGZvcm1FRGl0LnJlbW92ZSgpO1xuXG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9