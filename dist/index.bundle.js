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

/***/ "./src/models/Vechicles.ts":
/*!*********************************!*\
  !*** ./src/models/Vechicles.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Vechicles": () => (/* binding */ Vechicles)
/* harmony export */ });
/* harmony import */ var _Vechicle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vechicle */ "./src/models/Vechicle.ts");

class Vechicles extends _Vechicle__WEBPACK_IMPORTED_MODULE_0__.Vechicle {
    type;
    status;
    details;
    constructor(id, type, make, model, rentalPrice, status, details) {
        super();
        this.id = id,
            this.model = model,
            this.make = make,
            this.type = type,
            this.status = status,
            this.rentalPrice = rentalPrice,
            this.details = details;
    }
}


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

/***/ "./src/services/VechicleService.ts":
/*!*****************************************!*\
  !*** ./src/services/VechicleService.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VechicleService": () => (/* binding */ VechicleService)
/* harmony export */ });
/* harmony import */ var _models_Vechicles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/Vechicles */ "./src/models/Vechicles.ts");
/* harmony import */ var _Service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Service */ "./src/services/Service.ts");


class VechicleService extends _Service__WEBPACK_IMPORTED_MODULE_1__.DataService {
    s;
    parseRecord(record) {
        const data = record;
        const result = new _models_Vechicles__WEBPACK_IMPORTED_MODULE_0__.Vechicles(data.id, data.type, data.model, data.make, data.rentalPrice, data.status, data.details);
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
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom/dom */ "./src/dom/dom.ts");
/* harmony import */ var _dom_Editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom/Editor */ "./src/dom/Editor.ts");
/* harmony import */ var _dom_Table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom/Table */ "./src/dom/Table.ts");
/* harmony import */ var _services_Collection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/Collection */ "./src/services/Collection.ts");
/* harmony import */ var _services_Storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/Storage */ "./src/services/Storage.ts");
/* harmony import */ var _services_VechicleService__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/VechicleService */ "./src/services/VechicleService.ts");






const storage = new _services_Storage__WEBPACK_IMPORTED_MODULE_4__.LocalStorage();
const vechicles = new _services_Collection__WEBPACK_IMPORTED_MODULE_3__.Collections(storage, 'vehicles');
const service = new _services_VechicleService__WEBPACK_IMPORTED_MODULE_5__.VechicleService(vechicles);
const filterForm = document.querySelector('#filter-form');
const table = document.querySelector('table');
const tableManager = new _dom_Table__WEBPACK_IMPORTED_MODULE_2__.Table(table, createTableRow, identifyCar);
const form = new _dom_Editor__WEBPACK_IMPORTED_MODULE_1__.Editor(filterForm, onSubmit.bind(null, tableManager), ['type', 'availableOnly']);
hydrate(tableManager);
function createTableRow(vehicle) {
    const row = (0,_dom_dom__WEBPACK_IMPORTED_MODULE_0__.tr)({ vechicleId: vehicle.id, id: vehicle.id }, (0,_dom_dom__WEBPACK_IMPORTED_MODULE_0__.td)({}, vehicle.id), (0,_dom_dom__WEBPACK_IMPORTED_MODULE_0__.td)({}, vehicle.type), (0,_dom_dom__WEBPACK_IMPORTED_MODULE_0__.td)({}, vehicle.make), (0,_dom_dom__WEBPACK_IMPORTED_MODULE_0__.td)({}, vehicle.model), (0,_dom_dom__WEBPACK_IMPORTED_MODULE_0__.td)({}, `$${vehicle.rentalPrice}/day`), (0,_dom_dom__WEBPACK_IMPORTED_MODULE_0__.td)({}, vehicle.status), (0,_dom_dom__WEBPACK_IMPORTED_MODULE_0__.td)({}, (0,_dom_dom__WEBPACK_IMPORTED_MODULE_0__.a)({ className: 'details-link', href: `/details.html?${vehicle.id}` }, 'Details')));
    return row;
}
function identifyCar(vechicles, id) {
    return vechicles.find(e => e.id == id);
}
async function hydrate(tableManager) {
    if (localStorage.length != 0) {
        const vechicles = await service.getAll();
        for (let item of vechicles) {
            tableManager.add(item);
        }
    }
}
async function onSubmit(tableManager, { type, availableOnly }) {
    const data = await service.filter(type);
    console.log(type);
    for (let row of data) {
        let id = Object.values(row)[0];
        tableManager.remove(id);
    }
    const filterVehicles = await service.filter(type);
    console.log(filterVehicles, type);
    for (let item of filterVehicles) {
        tableManager.add(item);
    }
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEVBQUUsSUFBSSxDQUFDLENBQUM7SUFFbEMsS0FBSyxJQUFJLElBQUksSUFBSSxjQUFjLEVBQUU7UUFDN0IsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMxQjtBQUNMLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mbGVldF9tYW5hZ2VyLy4vc3JjL2RvbS9FZGl0b3IudHMiLCJ3ZWJwYWNrOi8vZmxlZXRfbWFuYWdlci8uL3NyYy9kb20vVGFibGUudHMiLCJ3ZWJwYWNrOi8vZmxlZXRfbWFuYWdlci8uL3NyYy9kb20vZG9tLnRzIiwid2VicGFjazovL2ZsZWV0X21hbmFnZXIvLi9zcmMvbW9kZWxzL1ZlY2hpY2xlLnRzIiwid2VicGFjazovL2ZsZWV0X21hbmFnZXIvLi9zcmMvbW9kZWxzL1ZlY2hpY2xlcy50cyIsIndlYnBhY2s6Ly9mbGVldF9tYW5hZ2VyLy4vc3JjL21vZGVscy91dGlsLnRzIiwid2VicGFjazovL2ZsZWV0X21hbmFnZXIvLi9zcmMvc2VydmljZXMvQ29sbGVjdGlvbi50cyIsIndlYnBhY2s6Ly9mbGVldF9tYW5hZ2VyLy4vc3JjL3NlcnZpY2VzL1NlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vZmxlZXRfbWFuYWdlci8uL3NyYy9zZXJ2aWNlcy9TdG9yYWdlLnRzIiwid2VicGFjazovL2ZsZWV0X21hbmFnZXIvLi9zcmMvc2VydmljZXMvVmVjaGljbGVTZXJ2aWNlLnRzIiwid2VicGFjazovL2ZsZWV0X21hbmFnZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZmxlZXRfbWFuYWdlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZmxlZXRfbWFuYWdlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2ZsZWV0X21hbmFnZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9mbGVldF9tYW5hZ2VyLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHRoIH0gZnJvbSBcIi4vZG9tXCI7XG5cbmV4cG9ydCBjbGFzcyBFZGl0b3Ige1xuICAgIHByaXZhdGUgbmFtZTogSFRNTEhlYWRpbmdFbGVtZW50XG4gICAgcHJpdmF0ZSBzZWN0aW9uOiBIVE1MRWxlbWVudFxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGZvcm06IEhUTUxGb3JtRWxlbWVudCxcbiAgICAgICAgcHJpdmF0ZSBjYWxsYmFjazogKGRhdGE6IG9iamVjdCkgPT4gYW55LFxuICAgICAgICBwcml2YXRlIHByb3BOYW1lczogc3RyaW5nW10sXG5cblxuICAgICkge1xuICAgICAgICB0aGlzLmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5vblN1Ym1pdC5iaW5kKHRoaXMpKTtcblxuICAgIH1cbiAgICBjcmVhdGUoKSB7XG5cbiAgICAgICAgdGhpcy5zZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXG4gICAgICAgIHRoaXMubmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgfVxuICAgIHNldFZhbHVlKG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmZvcm0ucXVlcnlTZWxlY3RvcihgW25hbWU9XCIke25hbWV9XCJdYCk7XG5cblxuICAgICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkge1xuICAgICAgICAgICAgaWYgKHRhcmdldC50eXBlID09ICdjaGVja2JveCcpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQuY2hlY2tlZCA9IHZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCB8fCB0YXJnZXQgaW5zdGFuY2VvZiBIVE1MVGV4dEFyZWFFbGVtZW50KSB7XG4gICAgICAgICAgICB0YXJnZXQudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldFZhbHVlcyhkYXRhOiBvYmplY3QpIHtcbiAgICAgICAgZm9yIChsZXQgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGRhdGEpKSB7XG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKGtleSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xlYXIoKSB7XG5cbiAgICAgICAgdGhpcy5uYW1lLnRleHRDb250ZW50ID0gJyc7XG5cbiAgICAgICAgdGhpcy5mb3JtLnJlc2V0KCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlKCkge1xuXG4gICAgICAgIHRoaXMuZm9ybS5yZW1vdmUoKTtcblxuXG4gICAgfVxuXG4gICAgYXR0YWNoVG8ocGFyZW50OiBOb2RlLCBuYW1lOiBzdHJpbmcsIHNlY3Rpb246IEhUTUxFbGVtZW50KSB7XG5cbiAgICAgICAgdGhpcy5zZWN0aW9uID0gc2VjdGlvbjtcbiAgICAgICAgdGhpcy5jcmVhdGUoKTtcbiAgICAgICAgdGhpcy5uYW1lLnRleHRDb250ZW50ID0gbmFtZTtcbiAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKHRoaXMubmFtZSk7XG4gICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZCh0aGlzLmZvcm0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25TdWJtaXQoZXZlbnQ6IFN1Ym1pdEV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmIChldmVudC5zdWJtaXR0ZXIuaWQpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5zdWJtaXR0ZXIuaWQgIT0gJ2NhbmNlbCcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSh0aGlzLmZvcm0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBPYmplY3QuZnJvbUVudHJpZXModGhpcy5wcm9wTmFtZXMubWFwKG4gPT4gW24sIGZvcm1EYXRhLmdldChuKV0pKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrKGRhdGEpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSh0aGlzLmZvcm0pO1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IE9iamVjdC5mcm9tRW50cmllcyh0aGlzLnByb3BOYW1lcy5tYXAobiA9PiBbbiwgZm9ybURhdGEuZ2V0KG4pXSkpO1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayhkYXRhKTtcbiAgICAgICAgfVxuXG4gICAgfVxufSIsIlxuXG5leHBvcnQgY2xhc3MgVGFibGUge1xuXG4gICAgcHJpdmF0ZSByZWNvcmRzOiBhbnlbXSA9IFtdO1xuICAgIHByaXZhdGUgcm93czogTWFwPG9iamVjdCwgSFRNTFRhYmxlUm93RWxlbWVudD4gPSBuZXcgTWFwKCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGVsZW1lbnQ6IEhUTUxUYWJsZUVsZW1lbnQsXG4gICAgICAgIHByaXZhdGUgY3JlYXRlUm93OiAocmVjb3JkOiBhbnkpID0+IEhUTUxUYWJsZVJvd0VsZW1lbnQsXG4gICAgICAgIHByaXZhdGUgaWRlbnRpZnk/OiAocmVjb3JkczogYW55W10sIGlkOiBhbnkpID0+IGFueSxcblxuICAgICAgICByZWNvcmRzPzogYW55W11cbiAgICApIHtcbiAgICAgICAgaWYgKHJlY29yZHMpIHtcbiAgICAgICAgICAgIHRoaXMucmVjb3JkcyA9IHJlY29yZHM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZWNvcmRzLmZvckVhY2godGhpcy5hZGQuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgYWRkKHJlY29yZDogYW55KSB7XG4gICAgICAgIGNvbnN0IHJvdyA9IHRoaXMuY3JlYXRlUm93KHJlY29yZCk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChyb3cpO1xuICAgICAgICB0aGlzLnJlY29yZHMucHVzaChyZWNvcmQpO1xuICAgICAgICB0aGlzLnJvd3Muc2V0KHJlY29yZCwgcm93KTtcbiAgICB9XG5cbiAgICBnZXQoaWQ6IGFueSk6IGFueSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5pZGVudGlmeSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmlkZW50aWZ5KHRoaXMucmVjb3JkcywgaWQpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoJ0luZGV0aXR5IGZ1bmN0aW9uIG5vdCBzcGVjaWZpZWQnKTtcbiAgICB9XG5cbiAgICBnZXRSb3coaWQ6IGFueSk6IEhUTUxUYWJsZVJvd0VsZW1lbnQge1xuICAgICAgICBjb25zdCByZWNvcmQgPSB0aGlzLmdldChpZCk7XG4gICAgICAgIHJldHVybiB0aGlzLnJvd3MuZ2V0KHJlY29yZCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlKGlkOiBhbnkpIHtcblxuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5nZXQoaWQpO1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMucmVjb3Jkcy5maW5kSW5kZXgoZCA9PiBkID09IGRhdGEpO1xuICAgICAgICBjb25zdCByb3cgPSB0aGlzLmdldFJvdyhpZCk7XG5cbiAgICAgICAgcm93LnJlbW92ZSgpO1xuICAgICAgICB0aGlzLnJvd3MuZGVsZXRlKGRhdGEpO1xuXG4gICAgICAgIC8vIFVwZGF0ZSByZWNvcmQgaW4gY29sbGVjdGlvblxuICAgICAgICB0aGlzLnJlY29yZHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG5cbiAgICByZXBsYWNlKGlkOiBhbnksIGRhdGE6IGFueSkge1xuXG4gICAgICAgIGNvbnN0IHJlY29yZCA9IHRoaXMuZ2V0KGlkKTtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnJlY29yZHMuZmluZEluZGV4KHIgPT4gciA9PSByZWNvcmQpO1xuICAgICAgICBjb25zdCByb3cgPSB0aGlzLmdldFJvdyhpZCk7XG5cbiAgICAgICAgLy8gVXBkYXRlIHJvdyBpbiBET00gYW5kIGNvbGxlY3Rpb25cbiAgICAgICAgY29uc3QgbmV3Um93ID0gdGhpcy5jcmVhdGVSb3coZGF0YSk7XG4gICAgICAgIHJvdy5yZXBsYWNlV2l0aChuZXdSb3cpO1xuICAgICAgICB0aGlzLnJvd3Muc2V0KHJlY29yZCwgbmV3Um93KTtcblxuICAgICAgICAvLyBVcGRhdGUgcmVjb3JkIGluIGNvbGxlY3Rpb25cbiAgICAgICAgdGhpcy5yZWNvcmRzLnNwbGljZShpbmRleCwgMSwgZGF0YSk7XG5cbiAgICB9XG4gICAgY2xlYXIoKXtcbiAgICAgXG4gICAgICAgIGZvcihsZXQgcm93IG9mICh0aGlzLnJvd3MpKXtcbiAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCB2YWx1ZXMgPSBPYmplY3QuZW50cmllcyhyb3dbMF0pXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMucm93cyk7XG4gICAgICAgICAgICBpZih0aGlzLmdldFJvdyh2YWx1ZXNbMF1bMV0pKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmdldFJvdyh2YWx1ZXNbMF1bMV0pKVxuICAgICAgICAgICAgICAgIGNvbnN0IHJvdyA9IHRoaXMuZ2V0Um93KHZhbHVlc1swXVsxXSk7XG4gICAgICAgICAgICAgICAgcm93LnJlbW92ZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIH1cbn0iLCJ0eXBlIERvbUNvbnRlbnQgPSBzdHJpbmcgfCBOb2RlO1xuXG50eXBlIGVsZW1lbnRGYWN0b3J5PFQgZXh0ZW5kcyBIVE1MRWxlbWVudD4gPSAocHJvcHM/OiBvYmplY3QsIC4uLmNvbnRlbnQ6IERvbUNvbnRlbnRbXSkgPT4gVDtcblxuZXhwb3J0IGZ1bmN0aW9uIGRvbSh0eXBlOiBzdHJpbmcsIHByb3BzPzogb2JqZWN0LCAuLi5jb250ZW50OiBEb21Db250ZW50W10pIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcblxuICAgIGlmIChwcm9wcykge1xuICAgICAgICBmb3IgKGxldCBwcm9wTmFtZSBpbiBwcm9wcykge1xuICAgICAgICAgICAgaWYgKHByb3BOYW1lLnN0YXJ0c1dpdGgoJ29uJykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBldmVudE5hbWUgPSBwcm9wTmFtZS5zbGljZSgyKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIHByb3BzW3Byb3BOYW1lXSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BOYW1lLnN0YXJ0c1dpdGgoJ2RhdGEnKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGFOYW1lID0gcHJvcE5hbWUuc2xpY2UoNCw1KS50b0xvd2VyQ2FzZSgpICsgcHJvcE5hbWUuc2xpY2UoNSk7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5kYXRhc2V0W2RhdGFOYW1lXSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudFtwcm9wTmFtZV0gPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpdGVtIG9mIGNvbnRlbnQpIHtcbiAgICAgICAgZWxlbWVudC5hcHBlbmQoaXRlbSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbmV4cG9ydCBjb25zdCB0YWJsZTogZWxlbWVudEZhY3Rvcnk8SFRNTFRhYmxlRWxlbWVudD4gPSBkb20uYmluZChudWxsLCAndGFibGUnKTtcbmV4cG9ydCBjb25zdCB0aGVhZDogZWxlbWVudEZhY3Rvcnk8SFRNTFRhYmxlU2VjdGlvbkVsZW1lbnQ+ID0gZG9tLmJpbmQobnVsbCwgJ3RoZWFkJyk7XG5leHBvcnQgY29uc3QgdGJvZHk6IGVsZW1lbnRGYWN0b3J5PEhUTUxUYWJsZVNlY3Rpb25FbGVtZW50PiA9IGRvbS5iaW5kKG51bGwsICd0Ym9keScpO1xuZXhwb3J0IGNvbnN0IHRyOiBlbGVtZW50RmFjdG9yeTxIVE1MVGFibGVSb3dFbGVtZW50PiA9IGRvbS5iaW5kKG51bGwsICd0cicpO1xuZXhwb3J0IGNvbnN0IHRoOiBlbGVtZW50RmFjdG9yeTxIVE1MVGFibGVDZWxsRWxlbWVudD4gPSBkb20uYmluZChudWxsLCAndGgnKTtcbmV4cG9ydCBjb25zdCB0ZDogZWxlbWVudEZhY3Rvcnk8SFRNTFRhYmxlQ2VsbEVsZW1lbnQ+ID0gZG9tLmJpbmQobnVsbCwgJ3RkJyk7XG5leHBvcnQgY29uc3QgYnV0dG9uOiBlbGVtZW50RmFjdG9yeTxIVE1MQnV0dG9uRWxlbWVudD4gPSBkb20uYmluZChudWxsLCAnYnV0dG9uJyk7XG5leHBvcnQgY29uc3QgYTogZWxlbWVudEZhY3Rvcnk8SFRNTEFuY2hvckVsZW1lbnQ+ID0gZG9tLmJpbmQobnVsbCwgJ2EnKTtcbiIsImltcG9ydCB7IFJlY29yZElkIH0gZnJvbSBcIi4uL3NlcnZpY2VzL1N0b3JhZ2VcIjtcbmltcG9ydCB7IFRydWNrIH0gZnJvbSBcIi4vVHJ1Y2tcIjtcbmltcG9ydCB7IENhcnMsIFJlY29yZCwgUmVudGVkLCBUcnVja3MgfSBmcm9tIFwiLi91dGlsXCI7XG5cblxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVmVjaGljbGUge1xuICAgIGlkOiBSZWNvcmRJZFxuICAgIG1ha2U6IHN0cmluZ1xuICAgIG1vZGVsOiBzdHJpbmdcbiAgICByZW50YWxQcmljZTogbnVtYmVyXG4gICAgcmVudGVkVG8/OiBzdHJpbmcgfCBudWxsXG59XG4vLyBDcmVhdGUgYWJzdHJhY3QgbW9kZWwgYFZlaGljbGVgIHdpdGggcHJvcGVydGllczpcbi8vIC0gYGlkYDogc3RyaW5nXG4vLyAtIGBtYWtlYDogc3RyaW5nXG4vLyAtIGBtb2RlbGA6IHN0cmluZ1xuLy8gLSBgcmVudGFsUHJpY2VgOiBudW1iZXJcbi8vIC0gYHJlbnRlZFRvYDogc3RyaW5nIG9yIG51bGxcblxuXG4iLCJpbXBvcnQgeyBCb2R5VHlwZSwgQ2FyZ28sIFRyYW5zbWlzc2lvbiB9IGZyb20gXCIuL3V0aWxcIjtcbmltcG9ydCB7IFZlY2hpY2xlIH0gZnJvbSBcIi4vVmVjaGljbGVcIjtcblxuXG5cbmV4cG9ydCBjbGFzcyBWZWNoaWNsZXMgZXh0ZW5kcyBWZWNoaWNsZSB7XG5cbiAgICB0eXBlOiAnY2FyJyB8ICd0cnVjaydcbiAgICBzdGF0dXM6ICdBdmFpbGFibGUnIHwgJ1JlbnRlZCdcbiAgICBkZXRhaWxzOiBIVE1MTElFbGVtZW50XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgaWQ6IHN0cmluZyxcbiAgICAgICAgdHlwZTogJ2NhcicgfCAndHJ1Y2snLFxuICAgICAgICBtYWtlOiBzdHJpbmcsXG4gICAgICAgIG1vZGVsOiBzdHJpbmcsXG4gICAgICAgIHJlbnRhbFByaWNlOiBudW1iZXIsXG4gICAgICAgIHN0YXR1czogJ0F2YWlsYWJsZScgfCAnUmVudGVkJyxcbiAgICAgICAgZGV0YWlsczogSFRNTExJRWxlbWVudFxuXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuaWQgPSBpZCxcblxuICAgICAgICAgICAgdGhpcy5tb2RlbCA9IG1vZGVsLFxuICAgICAgICAgICAgdGhpcy5tYWtlID0gbWFrZSxcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHR5cGUsXG5cbiAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gc3RhdHVzLFxuICAgICAgICAgICAgdGhpcy5yZW50YWxQcmljZSA9IHJlbnRhbFByaWNlLFxuICAgICAgICAgICAgdGhpcy5kZXRhaWxzID0gZGV0YWlsc1xuICAgICAgICAgXG5cbiAgICB9XG59IiwiaW1wb3J0IHsgUmVjb3JkSWQgfSBmcm9tIFwiLi4vc2VydmljZXMvU3RvcmFnZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlY29yZCB7XG4gICAgdHlwZT86IHN0cmluZztcbiAgICBpZDogc3RyaW5nXG59XG5cbmV4cG9ydCB0eXBlIFJlbnRlZCA9IHN0cmluZyB8IG51bGw7XG5cbmV4cG9ydCB0eXBlIEJvZHlUeXBlID0gJ3NlZGFuJyB8ICdzdXYnIHwgJ2hhdGNoYmFjayc7XG5cblxuZXhwb3J0IHR5cGUgVHJhbnNtaXNzaW9uID0gJ21hbnVhbCcgfCAnYXV0b21hdGljJztcblxuZXhwb3J0IHR5cGUgQ2FyZ28gPSAnYm94JyB8ICdmbGF0YmVkJyB8ICd2YW4nO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVJZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiAnMDAwMC0wMDAwJy5yZXBsYWNlKC8wL2csICgpID0+IChNYXRoLnJhbmRvbSgpICogMTYgfCAwKS50b1N0cmluZygxNikpO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENhcnMgZXh0ZW5kcyBSZWNvcmR7XG5cbiAgICBpZDogUmVjb3JkSWQsXG4gICAgbWFrZTogc3RyaW5nLFxuICAgIG1vZGVsOiBzdHJpbmcsXG4gICAgYm9keVR5cGU6IEJvZHlUeXBlLFxuICAgIG51bWJlck9mU2VhdHM6IG51bWJlcixcbiAgICB0cmFuc21pc3Npb246IFRyYW5zbWlzc2lvbixcbiAgICByZW50YWxQcmljZTogbnVtYmVyXG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBUcnVja3MgZXh0ZW5kcyBSZWNvcmR7XG5cbiAgICBpZDogUmVjb3JkSWQsXG4gICAgbWFrZTogc3RyaW5nLFxuICAgIG1vZGVsOiBzdHJpbmcsXG4gICAgY2FyZ29UeXBlOiBDYXJnbyxcbiAgICBjYXBhY2l0eTogbnVtYmVyLFxuICAgIHJlbnRhbFByaWNlOiBudW1iZXJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBWZWNoaWNsZSB7XG4gICAgaWQ6IFJlY29yZElkXG4gICAgbWFrZTogc3RyaW5nXG4gICAgbW9kZWw6IHN0cmluZ1xuICAgIHJlbnRhbFByaWNlOiBudW1iZXJcbiAgICByZW50ZWRUbz86IHN0cmluZyB8IG51bGxcbiAgICBib2R5VFlwZT8gOiBzdHJpbmdcbiAgICBudW1iZXJPZlNlYXRzPzogbnVtYmVyXG4gICAgdHJhbnNtaXNzaW9uPyA6IHN0cmluZ1xuICAgIGNhcmdvVHlwZT86IG51bWJlclxuICAgIGNhcGFjaXR5PzogbnVtYmVyXG4gICAgXG5cbn0iLCJpbXBvcnQgeyBSZWNvcmQgfSBmcm9tIFwiLi4vbW9kZWxzL3V0aWxcIjtcbmltcG9ydCB7IFJlY29yZElkLCBTdG9yYWdlIH0gZnJvbSBcIi4vU3RvcmFnZVwiO1xuXG5cbmV4cG9ydCBjbGFzcyBDb2xsZWN0aW9ucyB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBzdG9yYWdlOiBTdG9yYWdlLFxuICAgICAgICBwcml2YXRlIG5hbWU6IHN0cmluZykgeyB9XG5cblxuXG5cbiAgICBnZXRBbGwoKTogUHJvbWlzZTxSZWNvcmRbXT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zdG9yYWdlLmdldEFsbCh0aGlzLm5hbWUpO1xuICAgIH1cblxuICAgIGdldEJ5SWQoaWQ6IFJlY29yZElkKTogUHJvbWlzZTxSZWNvcmQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5nZXRCeUlkKHRoaXMubmFtZSwgaWQpO1xuICAgIH1cblxuICAgIGNyZWF0ZShkYXRhOiBhbnkpOiBQcm9taXNlPFJlY29yZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zdG9yYWdlLmNyZWF0ZSh0aGlzLm5hbWUsIGRhdGEpO1xuICAgIH1cblxuICAgIHVwZGF0ZShpZDogUmVjb3JkSWQsIGRhdGE6IGFueSk6IFByb21pc2U8UmVjb3JkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2UudXBkYXRlKHRoaXMubmFtZSwgaWQsIGRhdGEpO1xuICAgIH1cblxuICAgIGRlbGV0ZShpZDogUmVjb3JkSWQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5kZWxldGUodGhpcy5uYW1lLCBpZCk7XG4gICAgfVxuICAgIGFzeW5jIGZpbHRlcihjcml0ZXJpYTogc3RyaW5nKTogUHJvbWlzZTxSZWNvcmRbXT4ge1xuICAgICAgICByZXR1cm4gICAoYXdhaXQgdGhpcy5nZXRBbGwoKSkuZmlsdGVyKG9iaiA9PiBvYmouaGFzT3duUHJvcGVydHkoY3JpdGVyaWEpKTtcbiAgICAgICBcbiAgICAgICAgXG4gICAgICAgfVxufSIsImltcG9ydCB7IFJlY29yZCB9IGZyb20gXCIuLi9tb2RlbHMvdXRpbFwiO1xuaW1wb3J0IHsgQ29sbGVjdGlvbnMgfSBmcm9tIFwiLi9Db2xsZWN0aW9uXCI7XG5cblxuZXhwb3J0IGludGVyZmFjZSBTZXJ2aWNlPFQ+IHtcblxuXG4gICAgZ2V0QWxsKCk6IFByb21pc2U8VFtdPjtcbiAgICBnZXRCeUlkKGlkOiBzdHJpbmcpOiBQcm9taXNlPFQ+O1xuICAgIGNyZWF0ZShkYXRhKTogUHJvbWlzZTxUPjtcbiAgICB1cGRhdGUoaWQ6IGFueSwgZGF0YTogYW55KTogUHJvbWlzZTxUPlxuICAgIGRlbGV0ZShpZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPlxuXG59XG5cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIERhdGFTZXJ2aWNlPFQ+IGltcGxlbWVudHMgU2VydmljZTxUPntcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGNvbGxlY3Rpb246IENvbGxlY3Rpb25zXG4gICAgKSB7IH1cbiAgICBhc3luYyBnZXRBbGwoKTogUHJvbWlzZTxUW10+IHtcbiAgICAgICAgY29uc3QgcmVjb3JkcyA9IChhd2FpdCB0aGlzLmNvbGxlY3Rpb24uZ2V0QWxsKCkpLm1hcChyID0+IHRoaXMucGFyc2VSZWNvcmQocikpO1xuXG4gICAgICAgIHJldHVybiByZWNvcmRzO1xuICAgIH1cbiAgICBhc3luYyBnZXRCeUlkKGlkOiBzdHJpbmcpOiBQcm9taXNlPFQ+IHtcbiAgICAgICAgY29uc3QgcmVjb3JkID0gYXdhaXQgdGhpcy5jb2xsZWN0aW9uLmdldEJ5SWQoaWQpO1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJzZVJlY29yZChyZWNvcmQpO1xuICAgIH1cbiAgICBhc3luYyBjcmVhdGUoZGF0YTogYW55KTogUHJvbWlzZTxUPiB7XG4gICAgICAgIC8vIHRoaXMudmFsaWRhdGUoZGF0YSk7XG4gICAgICAgIGNvbnN0IHJlY29yZCA9IGF3YWl0IHRoaXMuY29sbGVjdGlvbi5jcmVhdGUoZGF0YSk7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlUmVjb3JkKHJlY29yZCk7XG4gICAgfVxuICAgIGFzeW5jIHVwZGF0ZShpZDogYW55LCBkYXRhOiBhbnkpOiBQcm9taXNlPFQ+IHtcbiAgICAgICAgLy90aGlzLnZhbGlkYXRlKGRhdGEpO1xuICAgICAgICBjb25zdCByZWNvcmQgPSBhd2FpdCB0aGlzLmNvbGxlY3Rpb24udXBkYXRlKGlkLCBkYXRhKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VSZWNvcmQocmVjb3JkKTtcbiAgICB9XG4gICAgYXN5bmMgZGVsZXRlKGlkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sbGVjdGlvbi5kZWxldGUoaWQpO1xuICAgIH1cblxuICAgIGFzeW5jIGZpbHRlcihjcml0ZXJpYTogc3RyaW5nKSB7XG5cblxuICAgICAgICBsZXQgcmVzdWx0XG4gICAgICAgIGlmIChjcml0ZXJpYS5lbmRzV2l0aCgncycpKSB7XG4gICAgICAgICAgICByZXN1bHQgPSAoYXdhaXQgdGhpcy5jb2xsZWN0aW9uLmdldEFsbCgpKS5maWx0ZXIob2JqID0+IG9iai50eXBlID09PSBjcml0ZXJpYS5zdWJzdHJpbmcoMCwgY3JpdGVyaWEubGVuZ3RoLTEpKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coY3JpdGVyaWEuc3Vic3RyaW5nKDAsIGNyaXRlcmlhLmxlbmd0aC0xKSlcbiAgICAgICAgfWVsc2UgaWYgKGNyaXRlcmlhLmluY2x1ZGVzKCcwJykpe1xuICAgICAgICAgICAgcmVzdWx0ID0gKGF3YWl0IHRoaXMuY29sbGVjdGlvbi5nZXRBbGwoKSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXN1bHQgPSAoYXdhaXQgdGhpcy5jb2xsZWN0aW9uLmdldEFsbCgpKS5maWx0ZXIob2JqID0+IG9iai5oYXNPd25Qcm9wZXJ0eShjcml0ZXJpYSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRcbiAgICB9XG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IHBhcnNlUmVjb3JkKHJlY29yZDogUmVjb3JkKTogVFxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCB2YWxpZGF0ZShkYXRhOiBhbnkpOiB2b2lkXG59XG4iLCJpbXBvcnQgeyBnZW5lcmF0ZUlkIH0gZnJvbSBcIi4uL21vZGVscy91dGlsXCI7XG5cblxuXG5leHBvcnQgdHlwZSBSZWNvcmRJZCA9IHN0cmluZztcblxuZXhwb3J0IHR5cGUgUmVjb3JkID0ge1xuICAgIGlkOiBSZWNvcmRJZDtcbn1cblxuXG5leHBvcnQgIGludGVyZmFjZSBTdG9yYWdlIHtcbiAgICBnZXRBbGwoY29sbGVjdGlvbk5hbWU6IHN0cmluZyk6IFByb21pc2U8UmVjb3JkW10+O1xuICAgIGdldEJ5SWQoY29sbGVjdGlvbk5hbWU6IHN0cmluZywgaWQ6IFJlY29yZElkKTogUHJvbWlzZTxSZWNvcmQ+O1xuICAgIGNyZWF0ZShjb2xsZWN0aW9uTmFtZTogc3RyaW5nLCBkYXRhOiBhbnkpOiBQcm9taXNlPFJlY29yZD47XG4gICAgdXBkYXRlKGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcsIGlkOiBSZWNvcmRJZCwgZGF0YTogYW55KTogUHJvbWlzZTxSZWNvcmQ+O1xuICAgIGRlbGV0ZShjb2xsZWN0aW9uTmFtZTogc3RyaW5nLCBpZDogUmVjb3JkSWQpOiBQcm9taXNlPHZvaWQ+O1xufVxuXG5cbmV4cG9ydCBjbGFzcyBMb2NhbFN0b3JhZ2UgaW1wbGVtZW50cyBTdG9yYWdlIHtcbiAgICBnZXRBbGwoY29sbGVjdGlvbk5hbWU6IHN0cmluZyk6IFByb21pc2U8UmVjb3JkW10+IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oY29sbGVjdGlvbk5hbWUpIHx8IG51bGwpIHx8IFtdO1xuICAgIH1cbiAgICBhc3luYyBnZXRCeUlkKGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcsIGlkOiBzdHJpbmcpOiBQcm9taXNlPFJlY29yZD4ge1xuICAgICAgICBjb25zdCBpdGVtcyA9IGF3YWl0IHRoaXMuZ2V0QWxsKGNvbGxlY3Rpb25OYW1lKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gaXRlbXMuZmluZChpID0+IGkuaWQgPT0gaWQpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBhc3luYyBjcmVhdGUoY29sbGVjdGlvbk5hbWU6IHN0cmluZywgZGF0YTogYW55KTogUHJvbWlzZTxSZWNvcmQ+IHtcbiAgICAgICAgY29uc3QgaXRlbXMgPSBhd2FpdCB0aGlzLmdldEFsbChjb2xsZWN0aW9uTmFtZSk7XG4gICAgICAgIGNvbnN0IHJlY29yZCA9IE9iamVjdC5hc3NpZ24oe30sIGRhdGEsIHsgaWQ6IGdlbmVyYXRlSWQoKSB9KTtcbiAgICAgICAgaXRlbXMucHVzaChyZWNvcmQpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShjb2xsZWN0aW9uTmFtZSwgSlNPTi5zdHJpbmdpZnkoaXRlbXMpKTtcblxuICAgICAgICByZXR1cm4gcmVjb3JkO1xuICAgIH1cbiAgICBhc3luYyB1cGRhdGUoY29sbGVjdGlvbk5hbWU6IHN0cmluZywgaWQ6IHN0cmluZywgZGF0YTogYW55KTogUHJvbWlzZTxSZWNvcmQ+IHtcbiAgICAgICAgY29uc3QgaXRlbXMgPSBhd2FpdCB0aGlzLmdldEFsbChjb2xsZWN0aW9uTmFtZSk7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gaXRlbXMuZmluZEluZGV4KGkgPT4gaS5pZCA9PSBpZCk7XG4gICAgICAgIGlmIChpbmRleCA9PSAtMSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKGBSZWNvcmQgJHtpZH0gbm90IGZvdW5kIGluIFwiJHtjb2xsZWN0aW9uTmFtZX1cImApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlY29yZCA9IE9iamVjdC5hc3NpZ24oe30sIGRhdGEsIHsgaWQgfSk7XG4gICAgICAgIGl0ZW1zW2luZGV4XSA9IHJlY29yZDtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oY29sbGVjdGlvbk5hbWUsIEpTT04uc3RyaW5naWZ5KGl0ZW1zKSk7XG5cbiAgICAgICAgcmV0dXJuIHJlY29yZDtcbiAgICB9XG4gICAgYXN5bmMgZGVsZXRlKGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcsIGlkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3QgaXRlbXMgPSBhd2FpdCB0aGlzLmdldEFsbChjb2xsZWN0aW9uTmFtZSk7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gaXRlbXMuZmluZEluZGV4KGkgPT4gaS5pZCA9PSBpZCk7XG4gICAgICAgIGlmIChpbmRleCA9PSAtMSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKGBSZWNvcmQgJHtpZH0gbm90IGZvdW5kIGluIFwiJHtjb2xsZWN0aW9uTmFtZX1cImApO1xuICAgICAgICB9XG4gICAgICAgIGl0ZW1zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGNvbGxlY3Rpb25OYW1lLCBKU09OLnN0cmluZ2lmeShpdGVtcykpO1xuICAgIH1cblxufVxuXG5cbiIsImltcG9ydCB7IENhciB9IGZyb20gXCIuLi9tb2RlbHMvQ2FyXCI7XG5pbXBvcnQgeyBUcnVjayB9IGZyb20gXCIuLi9tb2RlbHMvVHJ1Y2tcIjtcbmltcG9ydCB7IFZlY2hpY2xlIH0gZnJvbSBcIi4uL21vZGVscy9WZWNoaWNsZVwiO1xuaW1wb3J0IHsgVmVjaGljbGVzIH0gZnJvbSBcIi4uL21vZGVscy9WZWNoaWNsZXNcIjtcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSBcIi4vU2VydmljZVwiO1xuXG5cblxuZXhwb3J0IGNsYXNzIFZlY2hpY2xlU2VydmljZSBleHRlbmRzIERhdGFTZXJ2aWNlPFZlY2hpY2xlPntzXG4gICAgcHJvdGVjdGVkIHBhcnNlUmVjb3JkKHJlY29yZCk6IFZlY2hpY2xlIHtcblxuICAgICAgICBjb25zdCBkYXRhID0gcmVjb3JkO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgVmVjaGljbGVzKFxuICAgICAgICAgICAgZGF0YS5pZCxcbiAgICAgICAgICAgIGRhdGEudHlwZSxcbiAgICAgICAgICAgIGRhdGEubW9kZWwsXG4gICAgICAgICAgICBkYXRhLm1ha2UsXG4gICAgICAgICAgIFxuICAgICAgICAgICAgZGF0YS5yZW50YWxQcmljZSxcbiAgICAgICAgICAgIGRhdGEuc3RhdHVzLFxuICAgICAgICAgICAgZGF0YS5kZXRhaWxzXG5cblxuICAgICAgICApXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHByb3RlY3RlZCB2YWxpZGF0ZShkYXRhOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgLy8gaWYgKHR5cGVvZiBkYXRhLmJvZHlUeXBlICE9ICdzdHJpbmcnKSB7XG4gICAgICAgIC8vICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbmNvbXBhdGlibGUgcmVjb3JkLiBJbnZhbGlkIHByb3BlcnR5IFwiYm9keScpO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIGlmICh0eXBlb2YgZGF0YS5udW1iZXJzT2ZTZWF0cyAhPSAnbnVtYmVyJykge1xuICAgICAgICAvLyAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW5jb21wYXRpYmxlIHJlY29yZC4gSW52YWxpZCBwcm9wZXJ0eSBcInNlYXRzXCInKTtcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBpZiAodHlwZW9mIGRhdGEucmVudGFsUHJpY2UgIT0gJ251bWJlcicpIHtcbiAgICAgICAgLy8gICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0luY29tcGF0aWJsZSByZWNvcmQuIEludmFsaWQgcHJvcGVydHkgXCJyZW50XCInKTtcbiAgICAgICAgLy8gfVxuICAgIH1cblxuXG5cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGEsIGJ1dHRvbiwgdGQsIHRyIH0gZnJvbSBcIi4vZG9tL2RvbVwiO1xuaW1wb3J0IHsgRWRpdG9yIH0gZnJvbSBcIi4vZG9tL0VkaXRvclwiO1xuaW1wb3J0IHsgVGFibGUgfSBmcm9tIFwiLi9kb20vVGFibGVcIjtcbmltcG9ydCB7IFZlY2hpY2xlIH0gZnJvbSBcIi4vbW9kZWxzL1ZlY2hpY2xlXCI7XG5pbXBvcnQgeyBWZWNoaWNsZXMgfSBmcm9tIFwiLi9tb2RlbHMvVmVjaGljbGVzXCI7XG5pbXBvcnQgeyBDb2xsZWN0aW9ucyB9IGZyb20gXCIuL3NlcnZpY2VzL0NvbGxlY3Rpb25cIjtcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvU2VydmljZVwiO1xuaW1wb3J0IHsgTG9jYWxTdG9yYWdlIH0gZnJvbSBcIi4vc2VydmljZXMvU3RvcmFnZVwiO1xuaW1wb3J0IHsgVmVjaGljbGVTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvVmVjaGljbGVTZXJ2aWNlXCI7XG5cblxuY29uc3Qgc3RvcmFnZSA9IG5ldyBMb2NhbFN0b3JhZ2UoKTtcbmNvbnN0IHZlY2hpY2xlcyA9IG5ldyBDb2xsZWN0aW9ucyhzdG9yYWdlLCAndmVoaWNsZXMnKTtcbmNvbnN0IHNlcnZpY2UgPSBuZXcgVmVjaGljbGVTZXJ2aWNlKHZlY2hpY2xlcyk7XG5jb25zdCBmaWx0ZXJGb3JtOiBIVE1MRm9ybUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZmlsdGVyLWZvcm0nKTtcbmNvbnN0IHRhYmxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigndGFibGUnKTtcbmNvbnN0IHRhYmxlTWFuYWdlciA9IG5ldyBUYWJsZSh0YWJsZSwgY3JlYXRlVGFibGVSb3csIGlkZW50aWZ5Q2FyKTtcbmNvbnN0IGZvcm0gPSBuZXcgRWRpdG9yKGZpbHRlckZvcm0sIG9uU3VibWl0LmJpbmQobnVsbCwgdGFibGVNYW5hZ2VyKSwgWyd0eXBlJywgJ2F2YWlsYWJsZU9ubHknXSlcblxuaHlkcmF0ZSh0YWJsZU1hbmFnZXIpO1xuXG5mdW5jdGlvbiBjcmVhdGVUYWJsZVJvdyh2ZWhpY2xlOiBWZWNoaWNsZXMpIHtcbiAgICBjb25zdCByb3cgPSB0cih7IHZlY2hpY2xlSWQ6IHZlaGljbGUuaWQsIGlkOiB2ZWhpY2xlLmlkIH0sXG4gICAgICAgIHRkKHt9LCB2ZWhpY2xlLmlkLCksXG4gICAgICAgIHRkKHt9LCB2ZWhpY2xlLnR5cGUsKSxcbiAgICAgICAgdGQoe30sIHZlaGljbGUubWFrZSksXG4gICAgICAgIHRkKHt9LCB2ZWhpY2xlLm1vZGVsKSxcbiAgICAgICAgdGQoe30sIGAkJHt2ZWhpY2xlLnJlbnRhbFByaWNlfS9kYXlgKSxcbiAgICAgICAgdGQoe30sIHZlaGljbGUuc3RhdHVzKSxcbiAgICAgICAgdGQoe30sIGEoeyBjbGFzc05hbWU6ICdkZXRhaWxzLWxpbmsnLCBocmVmOiBgL2RldGFpbHMuaHRtbD8ke3ZlaGljbGUuaWR9YCB9LCAnRGV0YWlscycpKVxuICAgIClcblxuICAgIHJldHVybiByb3c7XG59XG5cbmZ1bmN0aW9uIGlkZW50aWZ5Q2FyKHZlY2hpY2xlczogVmVjaGljbGVzW10sIGlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdmVjaGljbGVzLmZpbmQoZSA9PiBlLmlkID09IGlkKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gaHlkcmF0ZSh0YWJsZU1hbmFnZXI6IFRhYmxlKSB7XG4gICAgaWYgKGxvY2FsU3RvcmFnZS5sZW5ndGggIT0gMCkge1xuICAgICAgICBjb25zdCB2ZWNoaWNsZXMgPSBhd2FpdCBzZXJ2aWNlLmdldEFsbCgpO1xuICAgICAgICBmb3IgKGxldCBpdGVtIG9mIHZlY2hpY2xlcykge1xuICAgICAgICAgICAgdGFibGVNYW5hZ2VyLmFkZChpdGVtKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5cbmFzeW5jIGZ1bmN0aW9uIG9uU3VibWl0KHRhYmxlTWFuYWdlcjogVGFibGUsIHsgdHlwZSwgYXZhaWxhYmxlT25seSB9KSB7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHNlcnZpY2UuZmlsdGVyKHR5cGUpO1xuICAgIGNvbnNvbGUubG9nKHR5cGUpXG4gICAgZm9yIChsZXQgcm93IG9mIGRhdGEpIHtcbiAgICAgICAgbGV0IGlkID0gT2JqZWN0LnZhbHVlcyhyb3cpWzBdO1xuXG4gICAgICAgIHRhYmxlTWFuYWdlci5yZW1vdmUoaWQpXG4gICAgfVxuICAgXG4gICAgY29uc3QgZmlsdGVyVmVoaWNsZXMgPSBhd2FpdCBzZXJ2aWNlLmZpbHRlcih0eXBlKTtcbiAgICBjb25zb2xlLmxvZyhmaWx0ZXJWZWhpY2xlcywgdHlwZSk7XG5cbiAgICBmb3IgKGxldCBpdGVtIG9mIGZpbHRlclZlaGljbGVzKSB7XG4gICAgICAgIHRhYmxlTWFuYWdlci5hZGQoaXRlbSk7XG4gICAgfVxufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==