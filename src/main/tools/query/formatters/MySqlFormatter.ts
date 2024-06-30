import { Table } from "../../../models/table";
import { INDENT } from "../../contants";
import Formatter from "./Formatter";

const DDL_CREATE_TABLE = "CREATE TABLE ";

export default class MySqlFormatter implements Formatter {
    format(table: Table): string {
        const startSentence = DDL_CREATE_TABLE + table.schema + "." + table.name + " (\n";
        const endSentence = "\n) COMMENT = '' AUTO_INCREMENT = 1\n;";

        const contentLines = [];
        table.columns.forEach((column) => {
            const line =
                `${INDENT}${column.name} ${column.dataType} ${
                    column.isNullable ? "NULL" : "NOT NULL"
                } COMMENT '${column.comment}'` +
                (column.name === table.columnKeyOption.primaryKeyColumnName ? " PRIMARY KEY" : "");
            contentLines.push(line);
        });
        contentLines.push(`${INDENT}PRIMARY KEY (${table.columnKeyOption.primaryKeyColumnName})`);
        Object.entries(table.columnKeyOption.uniqueKeyIndexAndColumnNamesMap)
            .sort((a, b) => a[0].localeCompare(b[0]))
            .forEach(([index, columnNames]) => {
                contentLines.push(`${INDENT}UNIQUE KEY uk${index} (${columnNames.join(", ")})`);
            });
        Object.entries(table.columnKeyOption.indexKeyIndexAndColumnNameMap)
            .sort((a, b) => a[0].localeCompare(b[0]))
            .forEach(([index, columnNames]) => {
                contentLines.push(`${INDENT}KEY idx${index} (${columnNames.join(", ")})`);
            });

        const query = contentLines.join(",\n");

        return startSentence + query + endSentence;
    }
}
