import { Table } from "../../../components/toast/models/table";

export default interface Formatter {
    format(table: Table): string;
}
