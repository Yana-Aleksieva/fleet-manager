

export class Table {

    private records: any[] = [];
    private rows: Map<object, HTMLTableRowElement> = new Map();

    constructor(
        public element: HTMLTableElement,
  
        private createRow: (record: any) => HTMLTableRowElement,
        private identify?: (records: any[], id: any) => any,

        records?: any[]
    ) {
        if (records) {
            this.records = records;
        }
        this.records.forEach(this.add.bind(this));
    }

    add(record: any) {
        const row = this.createRow(record);
        this.element.children[1].appendChild(row);
        this.records.push(record);
        this.rows.set(record, row);
    }

    get(id: any): any {
        if (typeof this.identify == 'function') {
            const result = this.identify(this.records, id);
            return result;
        }
        throw new ReferenceError('Indetity function not specified');
    }

    getRow(id: any): HTMLTableRowElement {
        const record = this.get(id);
        return this.rows.get(record);
    }

    remove(id: any) {

        const data = this.get(id);
        const index = this.records.findIndex(d => d == data);
        const row = this.getRow(id);

        row.remove();
        this.rows.delete(data);

        // Update record in collection
        this.records.splice(index, 1);
    }

    replace(id: any, data: any) {

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
    
}