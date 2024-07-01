import Box from "../../../components/box/Box";
import { Table } from "../../../components/toast/models/table";
import "./TablePreview.scss";

export default function TablePreview({ table }: { table: Table | undefined }) {
    return (
        <Box className="table-preview">
            <p className="title">Table Preview</p>
            {table && (
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th className="label">Name</th>
                                {table.columns.map((column) => (
                                    <th key={column.name}>{column.name}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="label">Type</td>
                                {table.columns.map((column) => (
                                    <td key={column.name}>{column.dataType}</td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </Box>
    );
}
