import Box from "../../../components/box/Box";
import { Table } from "../../../tools/drawio/models/table";
import "./QueryStat.scss";

export default function QueryStat({ table }: { table: Table | undefined }) {
    return (
        <Box className="query-stat">
            <p className="title">Query Stat</p>
            {table && (
                <table>
                    <tbody>
                        <tr>
                            <th>Columns</th>
                            <td>{table.columns.length}</td>
                        </tr>
                        <tr>
                            <th>Primary Key</th>
                            <td>{table.columnKeyOption.primaryKeyColumnName}</td>
                        </tr>
                        <tr>
                            <th>Unique Keys</th>
                            <td>{Object.keys(table.columnKeyOption.uniqueKeyIndexAndColumnNamesMap).length}</td>
                        </tr>
                        <tr>
                            <th>Index Keys</th>
                            <td>{Object.keys(table.columnKeyOption.indexKeyIndexAndColumnNameMap).length}</td>
                        </tr>
                        <tr>
                            <th>Foreign Keys</th>
                            <td>
                                {Object.values(table.columnKeyOption.foreignKeyIndexAndColumnNameMap).flat().length}
                            </td>
                        </tr>
                    </tbody>
                </table>
            )}
        </Box>
    );
}
