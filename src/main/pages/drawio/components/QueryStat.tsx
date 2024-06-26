import { Table } from "../../../models/table";
import "./QueryStat.scss";

export default function QueryStat({ table }: { table: Table | undefined }) {
    return (
        <article className="box query-stat">
            <p className="title">Query Stat</p>
            {table && (
                <table>
                    <tbody>
                        <tr>
                            <th>Columns Count</th>
                            <td>{table.columns.length}</td>
                        </tr>
                        <tr>
                            <th>Primary Key</th>
                            <td>{table.columnKeyOption.primaryKeyColumnName}</td>
                        </tr>
                        <tr>
                            <th>Unique Keys Count</th>
                            <td>
                                {
                                    Object.keys(
                                        table.columnKeyOption.uniqueKeyIndexAndColumnNamesMap
                                    ).length
                                }
                            </td>
                        </tr>
                        <tr>
                            <th>Index Keys Count</th>
                            <td>
                                {
                                    Object.keys(table.columnKeyOption.indexKeyIndexAndColumnNameMap)
                                        .length
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
            )}
        </article>
    );
}
