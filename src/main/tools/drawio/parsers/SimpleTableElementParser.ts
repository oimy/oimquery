import Failure from "../Failure";
import Result from "../Result";
import ConstraintAndNameAndTypeAndCommentTemplateConverter from "../converters/template/ConstraintAndNameAndTypeAndCommentTemplateParser";
import ConstraintAndNameAndTypeTemplateConverter from "../converters/template/ConstraintAndNameAndTypeTemplateParser";
import TemplateConverter from "../converters/template/TemplateConverter";
import { TemplateConvertResult } from "../converters/template/models";
import TableElementParser from "./TableElementParser";
import {
    InvalidHtmlTextFailure,
    LackOfCellValuesFailures,
    NotSupportedTextFailure,
} from "./failures";
import { TableElementParseResult } from "./models";

const DOM_PARSER = new DOMParser();
const MINIMUM_CELL_VALUES_LENGTH = 4;
const GRAPH_MODEL_TAG = "<mxGraphModel>";

export class CellParseResult extends Result {
    cellValues: string[];
    columnCount: number;

    private constructor(
        cellValues: string[],
        columnCount: number,
        isSuccess: boolean,
        failures: Failure[]
    ) {
        super(isSuccess, failures);
        this.cellValues = cellValues;
        this.columnCount = columnCount;
    }

    static ofSuccess(cellValues: string[], columnCount: number) {
        return new CellParseResult(cellValues, columnCount, true, []);
    }

    static ofFail(failures: Failure[]) {
        return new CellParseResult([], 0, false, failures);
    }

    static ofOneFail(failure: Failure) {
        return new CellParseResult([], 0, false, [failure]);
    }
}

export default class SimpleTableElementParser implements TableElementParser {
    private parseElementToCell(tableElementText: string): CellParseResult {
        const decodedTableElementText: string = decodeURIComponent(tableElementText);
        if (!decodedTableElementText.includes(GRAPH_MODEL_TAG)) {
            return CellParseResult.ofOneFail(new NotSupportedTextFailure());
        }

        let document: Document;
        try {
            document = DOM_PARSER.parseFromString(decodedTableElementText, "text/html");
        } catch (e) {
            return CellParseResult.ofOneFail(new InvalidHtmlTextFailure());
        }

        const mxCellNodes: XPathResult = document.evaluate(
            "//mxCell",
            document,
            null,
            XPathResult.ORDERED_NODE_ITERATOR_TYPE,
            null
        );

        const cellValues: string[] = [];
        const parentIds: string[] = [];
        let mxCellNode: Node | null = mxCellNodes.iterateNext();
        while (mxCellNode) {
            cellValues.push(
                document.evaluate("./@value", mxCellNode, null, XPathResult.STRING_TYPE, null)
                    .stringValue
            );
            parentIds.push(
                document.evaluate("./@parent", mxCellNode, null, XPathResult.STRING_TYPE, null)
                    .stringValue
            );
            mxCellNode = mxCellNodes.iterateNext();
        }
        if (cellValues.length < MINIMUM_CELL_VALUES_LENGTH) {
            return CellParseResult.ofOneFail(
                new LackOfCellValuesFailures(MINIMUM_CELL_VALUES_LENGTH)
            );
        }

        const parentIdAndCountMap = parentIds.reduce((acc, parentId) => {
            acc[parentId] = acc[parentId] + 1 || 1;
            return acc;
        }, {} as Record<string, number>);

        let maxColumnCount: number = 0;
        Object.entries(parentIdAndCountMap).forEach(([parentId, count]) => {
            const parentKey = parseInt(parentId);
            if (parentKey <= 2) {
                return;
            }
            maxColumnCount = Math.max(maxColumnCount, count);
        });

        return CellParseResult.ofSuccess(cellValues, maxColumnCount);
    }

    private determineTemplateConverter(columnCount: number): TemplateConverter {
        switch (columnCount) {
            case 4:
                return new ConstraintAndNameAndTypeAndCommentTemplateConverter();
            case 3:
                return new ConstraintAndNameAndTypeTemplateConverter();
            default:
                throw new Error("not supported column count " + columnCount);
        }
    }

    parse(tableElementText: string): TableElementParseResult {
        const cellParseResult: CellParseResult = this.parseElementToCell(tableElementText);
        if (!cellParseResult.isSuccess) {
            return TableElementParseResult.ofFail(cellParseResult.failures);
        }
        const templateConverter: TemplateConverter = this.determineTemplateConverter(
            cellParseResult.columnCount
        );
        const templateConvertResult: TemplateConvertResult = templateConverter.convert(
            cellParseResult.cellValues
        );
        if (!templateConvertResult.isSuccess) {
            return TableElementParseResult.ofFail(templateConvertResult.failures);
        }
        return TableElementParseResult.ofSuccess(
            templateConvertResult.title,
            templateConvertResult.rows
        );
    }
}
