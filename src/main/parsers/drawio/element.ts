import { TableElement, determineParseFunction } from "./template";

const domParser = new DOMParser();

export function parseTableElementTextToTableElement(tableElementText: string): TableElement {
    const decodedTableElementText: string = decodeURIComponent(tableElementText);
    const document: Document = domParser.parseFromString(decodedTableElementText, "text/html");

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

    return determineParseFunction(maxColumnCount)(cellValues);
}
