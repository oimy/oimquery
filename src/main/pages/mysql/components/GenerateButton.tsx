import { useContext, useState } from "react";
import { toast } from "react-toastify";
import Modal from "../../../components/modal/Modal";
import Tooltip from "../../../components/tooltip/Tooltip";
import Failure from "../../../tools/drawio/Failure";
import ColumnConverter from "../../../tools/drawio/converters/element/ColumnConverter";
import TableNameConverter from "../../../tools/drawio/converters/element/TableNameConverter";
import { Table } from "../../../tools/drawio/models/table";
import SimpleTableElementParser from "../../../tools/drawio/parsers/SimpleTableElementParser";
import { readClipboardTextOrBlank } from "../../../utils/clipboard";
import { MysqlSetting, MysqlSettingContext, saveMysqlSetting } from "../MysqlSettingContext";
import "./GenerateButton.scss";
import GenerateOptionEditModal from "./modals/GenerateOptionEditModal";

const TABLE_ELEMENT_PARSER = new SimpleTableElementParser();
const TABLE_NAME_CONVERTER = new TableNameConverter();
const COLUMN_CONVERTER = new ColumnConverter();

export default function GenerateButton({
    setOption,
    onGenerate,
    onFail,
}: {
    setOption: (option: MysqlSetting) => void;
    onGenerate: (table: Table) => void;
    onFail: () => void;
}) {
    const option: MysqlSetting = useContext(MysqlSettingContext);

    function handleFailures(failures: Failure[]) {
        failures.forEach((failure) => {
            toast(failure.message, { type: "error" });
        });
        onFail();
    }

    async function handleClickGenerateButton() {
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

    const [isShowTooltip, setIsShowTooltip] = useState<boolean>(false);
    const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [clipboardText, setClipboardText] = useState<string>("");

    function handleMouseOver() {
        if (!isShowTooltip) {
            setIsShowTooltip(true);
        }
        readClipboardTextOrBlank()
            .then((text) => {
                const decodedText = decodeURIComponent(text);
                if (decodedText.startsWith("<mxGraphModel>")) {
                    const tableElementParseResult = TABLE_ELEMENT_PARSER.parse(decodedText);
                    if (!tableElementParseResult.isSuccess) {
                        return setClipboardText(decodedText);
                    }
                    const tableNameConvertResult = TABLE_NAME_CONVERTER.convert(tableElementParseResult.title);
                    if (!tableNameConvertResult) {
                        return setClipboardText(decodedText);
                    }
                    let graphText = [tableNameConvertResult.name]
                        .concat(tableElementParseResult.rows.map((row) => row.columnName))
                        .join(",\n");
                    setClipboardText(graphText);
                    return;
                }
                setClipboardText(decodedText);
            })
            .catch(() => {});
    }

    function handleMouseLeave() {
        if (isShowTooltip) {
            setIsShowTooltip(false);
        }
    }

    function handleMouseMove(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        setMousePosition({ x: e.clientX, y: e.clientY });
    }

    const [modal, setModal] = useState<"edit-option" | "">("");

    return (
        <article className="box generate-button">
            <div className="columns">
                <div className="column has-7-8">
                    <button
                        className="submit"
                        onClick={handleClickGenerateButton}
                        onMouseEnter={handleMouseOver}
                        onMouseLeave={handleMouseLeave}
                        onMouseMove={handleMouseMove}
                    >
                        {option.isCopyOnGenerate ? "GENERATE & COPY" : "GENERATE"}
                    </button>
                </div>
                <div className="column has-1-8">
                    <button className="option" onClick={() => setModal("edit-option")}>
                        <i className="fa-solid fa-gear" />
                    </button>
                </div>
            </div>
            {option.isShowClipboardHint && clipboardText && (
                <Tooltip
                    text={clipboardText}
                    clientX={mousePosition.x}
                    clientY={mousePosition.y}
                    isShow={isShowTooltip}
                />
            )}
            {modal === "edit-option" && (
                <Modal onClose={() => setModal("")}>
                    <GenerateOptionEditModal
                        onChange={(option: MysqlSetting) => {
                            setOption(option);
                            saveMysqlSetting(option);
                        }}
                    />
                </Modal>
            )}
        </article>
    );
}
