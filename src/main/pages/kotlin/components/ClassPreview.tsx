import hljs from "highlight.js/lib/core";
import { useEffect } from "react";
import Box from "../../../components/box/Box";
import { BLANK } from "../../../tools/constants";
import { Table } from "../../../tools/drawio/models/table";
import KotlinEntityFormatter, { KotlinEntityOption } from "../../../tools/format/KotlinFormatter";

const KOTLIN_ENTITY_FORMATTER = new KotlinEntityFormatter();

export default function ClassPreview({ table, option }: { table?: Table | undefined; option: KotlinEntityOption }) {
    const classText: string = table ? KOTLIN_ENTITY_FORMATTER.format(table, option) : BLANK;
    // if (option.isCopyOnGenerate && query !== BLANK) {
    //     safelyWriteToClipboard(query);
    // }

    useEffect(() => {
        if (!classText) {
            return;
        }

        hljs.highlightAll();
    }, [classText]);

    return (
        <Box className="class-preview">
            <p className="title">Class Preview</p>
            <div
                className="pre-container"
                onClick={() => {
                    // if (table && query) {
                    //     safelyWriteToClipboard(query);
                    //     toast(`copied query '${table.name}'`, { type: "info" });
                    // }
                }}
            >
                <pre>
                    <code key={classText.length} className="language-kotlin hljs">
                        {classText}
                    </code>
                </pre>
            </div>
        </Box>
    );
}
