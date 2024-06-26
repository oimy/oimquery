import { useState } from "react";
import { Table } from "../../models/table";
import Generator from "./components/Generator";
import QueryPreview from "./components/QueryPreview";
import QueryStat from "./components/QueryStat";
import TablePreview from "./components/TablePreview";

export default function Drawio() {
    const [table, setTable] = useState<Table>();
    const [isCopyQuery, setIsCopyQuery] = useState<boolean>(true);

    return (
        <section className="container drawio">
            <Generator onGenerate={(table: Table) => setTable(table)} />
            <TablePreview table={table} />
            <div className="columns">
                <div className="column two-third">
                    <QueryPreview table={table} isCopy={isCopyQuery} />
                </div>
                <div className="column one-third">
                    <QueryStat table={table} />
                </div>
            </div>
        </section>
    );
}
