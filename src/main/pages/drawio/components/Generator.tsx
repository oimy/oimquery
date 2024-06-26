import { Table } from "../../../models/table";
import {
    ColumnConvertResult,
    ColumnParseResult,
    convertColumnParseResults,
    parseColumn,
} from "../../../parsers/drawio/column";
import { parseTableElementTextToTableElement } from "../../../parsers/drawio/element";
import { RowElement, TableElement } from "../../../parsers/drawio/template";
import { TitleParseResult, parseTableTitle } from "../../../parsers/drawio/title";
import "./Generator.scss";

export default function Generator({ onGenerate }: { onGenerate: (table: Table) => void }) {
    async function handleClick() {
        const tableElementText: string = await navigator.clipboard.readText();
        const tableElement: TableElement = parseTableElementTextToTableElement(tableElementText);
        const titleParseResult: TitleParseResult = parseTableTitle(tableElement.title);
        if (!titleParseResult.isSuccess) {
            alert(titleParseResult.failures);
        }

        const columnParseResults: ColumnParseResult[] = tableElement.rows.map(
            (rowElement: RowElement) => parseColumn(rowElement)
        );
        const columnConvertResult: ColumnConvertResult =
            convertColumnParseResults(columnParseResults);
        if (!columnConvertResult.isSuccess) {
            alert(columnConvertResult.failures);
        }

        const table: Table = {
            schema: titleParseResult.schema,
            name: titleParseResult.name,
            columns: columnConvertResult.columns,
            columnKeyOption: {
                primaryKeyColumnName: columnConvertResult.primaryKeyColumnName,
                uniqueKeyIndexAndColumnNamesMap:
                    columnConvertResult.uniqueKeyIndexAndColumnNamesMap,
                indexKeyIndexAndColumnNameMap: columnConvertResult.indexKeyIndexAndColumnNamesMap,
            },
        };

        onGenerate(table);
    }

    return (
        <article className="box graph-input">
            <div className="columns">
                <div className="column has-7-8">
                    <button className="submit" onClick={handleClick}>
                        SUBMIT
                    </button>
                </div>
                <div className="column has-1-8">
                    <button className="option">
                        <i className="fa-solid fa-gear" />
                    </button>
                </div>
            </div>
        </article>
    );
}
