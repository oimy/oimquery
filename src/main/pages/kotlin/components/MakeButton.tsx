import { toast } from "react-toastify";
import Column from "../../../components/column/Column";
import Columns from "../../../components/column/Columns";
import ColumnConverter from "../../../tools/drawio/converters/element/ColumnConverter";
import TableNameConverter from "../../../tools/drawio/converters/element/TableNameConverter";
import Failure from "../../../tools/drawio/Failure";
import { Table } from "../../../tools/drawio/models/table";
import SimpleTableElementParser from "../../../tools/drawio/parsers/SimpleTableElementParser";
import { KotlinEntityOption } from "../../../tools/format/KotlinFormatter";
import { readClipboardTextOrBlank } from "../../../utils/clipboard";
import "./MakeButton.scss";

const TABLE_ELEMENT_PARSER = new SimpleTableElementParser();
const TABLE_NAME_CONVERTER = new TableNameConverter();
const COLUMN_CONVERTER = new ColumnConverter();

export default function MakeButton({
    setOption,
    onGenerate,
    onFail,
}: {
    setOption: (option: KotlinEntityOption) => void;
    onGenerate: (table: Table) => void;
    onFail: () => void;
}) {
    function handleFailures(failures: Failure[]) {
        failures.forEach((failure) => {
            toast(failure.message, { type: "error" });
        });
        onFail();
    }

    async function handleClickMakeButton() {
        const tableElementText: string = await readClipboardTextOrBlank();
        const tableElementParseResult = TABLE_ELEMENT_PARSER.parse(tableElementText);
        if (!tableElementParseResult.isSuccess) {
            return handleFailures(tableElementParseResult.failures);
        }

        const tableNameConvertResult = TABLE_NAME_CONVERTER.convert(tableElementParseResult.title);
        if (!tableNameConvertResult.isSuccess) {
            return handleFailures(tableNameConvertResult.failures);
        }
        const columnConvertResult = COLUMN_CONVERTER.convert(tableElementParseResult.rows);
        if (!columnConvertResult.isSuccess) {
            return handleFailures(columnConvertResult.failures);
        }

        onGenerate({
            schema: tableNameConvertResult.schema,
            name: tableNameConvertResult.name,
            columns: columnConvertResult.columns,
            columnKeyOption: {
                primaryKeyColumnName: columnConvertResult.primaryKeyColumnName,
                uniqueKeyIndexAndColumnNamesMap: columnConvertResult.uniqueKeyIndexAndColumnNamesMap,
                indexKeyIndexAndColumnNameMap: columnConvertResult.indexKeyIndexAndColumnNamesMap,
                foreignKeyIndexAndColumnNameMap: columnConvertResult.foreignKeyIndexAndColumnNamesMap,
            },
        });
    }

    return (
        <article className="box make-button">
            <Columns>
                <Column className="has-7-8">
                    <button className="submit" onClick={handleClickMakeButton}>
                        MAKE CLASS
                    </button>
                </Column>
                <Column className="has-1-8">
                    <button className="option">
                        <i className="fa-solid fa-gear" />
                    </button>
                </Column>
            </Columns>
        </article>
    );
}
