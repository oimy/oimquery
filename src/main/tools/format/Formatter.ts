import { Table } from "../drawio/models/table";

export default interface Formatter {
    format(table: Table): string;
}
