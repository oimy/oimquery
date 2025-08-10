import hljs from "highlight.js/lib/core";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import Box from "../../../components/box/Box";
import { BLANK } from "../../../tools/constants";
import { Table } from "../../../tools/drawio/models/table";
import KotlinEntityClassFormatter from "../../../tools/format/KotlinEntityClassFormatter";
import { safelyWriteToClipboard } from "../../../utils/clipboard";
import { KotlinSetting, KotlinSettingContext } from "../KotlinSettingContext";
import "./ClassPreview.scss";

const KOTLIN_ENTITY_FORMATTER = new KotlinEntityClassFormatter();

export default function ClassPreview({ table }: { table?: Table | undefined }) {
    const setting: KotlinSetting = useContext(KotlinSettingContext);

    const classText: string = table ? KOTLIN_ENTITY_FORMATTER.format(table, setting) : BLANK;

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
                    if (table && classText && setting.isCopyOnClick) {
                        safelyWriteToClipboard(classText);
                        toast(`copied class for table '${table.name}'`, { type: "info" });
                    }
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
