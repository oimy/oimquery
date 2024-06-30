import { Table } from "../../../models/table";

export default interface Formatter {
    format(table: Table): string;
}
