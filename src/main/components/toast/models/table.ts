import { Column, ColumnKeyOption } from "./column";

export interface Table {
    schema: string;
    name: string;
    columns: Column[];
    columnKeyOption: ColumnKeyOption;
}
