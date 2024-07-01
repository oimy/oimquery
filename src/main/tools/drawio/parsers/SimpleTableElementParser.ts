import Failure from "../Failure";
import ConstraintAndNameAndTypeAndCommentTemplateConverter from "../converters/template/ConstraintAndNameAndTypeAndCommentTemplateParser";
import ConstraintAndNameAndTypeTemplateConverter from "../converters/template/ConstraintAndNameAndTypeTemplateParser";
import TemplateConverter from "../converters/template/TemplateConverter";
import { TemplateConvertResult } from "../converters/template/models";
import TableElementParser from "./TableElementParser";
import {
    InsufficientRowsFailure,
    NotSupportedTemplateFailure,
    NotSupportedTextFailure,
} from "./failures";
import { CellParseResult, TableElementParseResult } from "./models";

const DOM_PARSER = new DOMParser();
const MINIMUM_CELL_VALUES_LENGTH = 5;
const GRAPH_MODEL_TAG = "<mxgraphmodel>";

export default class SimpleTableElementParser implements TableElementParser {
    private parseElementToCell(tableElementText: string): CellParseResult {
        const decodedTableElementText: string = decodeURIComponent(tableElementText);
        if (!decodedTableElementText.toLowerCase().includes(GRAPH_MODEL_TAG)) {
            return CellParseResult.ofOneFail(new NotSupportedTextFailure());
        }

        const document: Document = DOM_PARSER.parseFromString(decodedTableElementText, "text/html");
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
            return CellParseResult.ofOneFail(new InsufficientRowsFailure());
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

    private determineTemplateConverter(columnCount: number): TemplateConverter | Failure {
        switch (columnCount) {
            case 4:
                return new ConstraintAndNameAndTypeAndCommentTemplateConverter();
            case 3:
                return new ConstraintAndNameAndTypeTemplateConverter();
            default:
                return new NotSupportedTemplateFailure("not supported column count " + columnCount);
        }
    }

    parse(tableElementText: string): TableElementParseResult {
        const cellParseResult: CellParseResult = this.parseElementToCell(tableElementText);
        if (!cellParseResult.isSuccess) {
            return TableElementParseResult.ofFail(cellParseResult.failures);
        }

        const templateConverter = this.determineTemplateConverter(cellParseResult.columnCount);
        if (templateConverter instanceof Failure) {
            return TableElementParseResult.ofFail([templateConverter]);
        }

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
