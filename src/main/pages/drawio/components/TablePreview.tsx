import { Table } from "../../../models/table";
import "./TablePreview.scss";

export default function TablePreview({ table }: { table: Table | undefined }) {
    return (
        <article className="box table-preview">
            <p className="title">Table Preview</p>
            {table && (
                <div className="table-container">
                    <table>
                        <thead>
                            {table.columns.map((column) => (
                                <th>{column.name}</th>
                            ))}
                        </thead>
                        <tbody>
                            <tr>
                                {table.columns.map((column) => (
                                    <td>{column.dataType}</td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </article>
    );
}
