import { Table } from "../../../models/table";
import MySqlFormatter from "../../../tools/query/formatters/MySqlFormatter";
import "./QueryPreview.scss";

const MYSQL_FORMATTER = new MySqlFormatter();

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
        query = MYSQL_FORMATTER.format(table);
        if (isCopy) {
            navigator.clipboard.writeText(query);
        }
    }

    return (
        <article className="box query-preview">
            <p className="title">Query Preview</p>
            <div className="pre-container">
                <pre>{query}</pre>
            </div>
        </article>
    );
}
