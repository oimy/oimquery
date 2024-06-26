import hljs from "highlight.js/lib/core";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import Box from "../../../components/box/Box";
import { Table } from "../../../components/toast/models/table";
import { BLANK } from "../../../tools/contants";
import MySqlFormatter from "../../../tools/query/formatters/MySqlFormatter";
import { safelyWriteToClipboard } from "../../../utils/clipboard";
import { DrawioOption, DrawioOptionContext } from "../DrawioOptionContext";
import "./QueryPreview.scss";

const MYSQL_FORMATTER = new MySqlFormatter();

export default function QueryPreview({ table }: { table: Table | undefined }) {
    const option: DrawioOption = useContext(DrawioOptionContext);

    const query: string = table ? MYSQL_FORMATTER.format(table) : BLANK;
    if (option.isCopyOnGenerate && query !== BLANK) {
        safelyWriteToClipboard(query);
    }

    useEffect(() => {
        if (!query) {
            return;
        }

        hljs.highlightAll();
    }, [query]);

    return (
        <Box className="query-preview">
            <p className="title">Query Preview</p>
            <div
                className="pre-container"
                onClick={() => {
                    if (table && query) {
                        safelyWriteToClipboard(query);
                        toast(`copied query '${table.name}'`, { type: "info" });
                    }
                }}
            >
                <pre>
                    <code key={query.length} className="language-sql hljs">
                        {query}
                    </code>
                </pre>
            </div>
        </Box>
    );
}
