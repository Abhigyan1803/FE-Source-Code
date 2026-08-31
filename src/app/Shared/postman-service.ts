import { Injectable } from '@angular/core';

@Injectable()
export class PostmanService {

    rowData: any = [];
    constructor() { }

    setRowData(val: object) {
        this.rowData = val;
    }

    getRowData() {
        return this.rowData;
    }
}