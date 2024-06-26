import { formatForMySql } from "../../../formatters/drawio/mysql";
import { Table } from "../../../models/table";
import "./QueryPreview.scss";

export default function QueryPreview({
    table,
    isCopy,
}: {
    table: Table | undefined;
    isCopy: boolean;
}) {
    let query = "";
    if (!table) {
        query = "";
    } else {
        query = formatForMySql(table);
        if (isCopy) {
            navigator.clipboard.writeText(query);
        }
    }

    return (
        <article className="box query-preview">
            <p className="title">Query Preview</p>
            <pre>{query}</pre>
        </article>
    );
}
