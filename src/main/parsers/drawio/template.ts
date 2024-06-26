import { BLANK } from "../../contants";

export interface RowElement {
    sequence: number;
    key: string;
    columnName: string;
    type: string;
    comment: string;
}

export interface TableElement {
    title: string;
    rows: RowElement[];
}

export function determineParseFunction(
    columnCount: number
): (nodeValues: string[]) => TableElement {
    switch (columnCount) {
        case 4:
            return parseNodeValuesByConstraintAndNameAndTypeAndComment;
        case 3:
            return parseNodeValuesByConstraintAndNameAndType;
        default:
            throw new Error("columnLength must be 3 or 4");
    }
}

export function parseNodeValuesByConstraintAndNameAndTypeAndComment(
    cellValues: string[]
): TableElement {
    const title: string = cellValues[2];
    const rows: RowElement[] = [];
    for (let i = 4; i < cellValues.length; i += 5) {
        const row: RowElement = {
            sequence: i,
            key: cellValues[i],
            columnName: cellValues[i + 1],
            type: cellValues[i + 2],
            comment: cellValues[i + 3],
        };
        rows.push(row);
    }

    return {
        title: title,
        rows: rows,
    };
}

export function parseNodeValuesByConstraintAndNameAndType(cellValues: string[]): TableElement {
    const title: string = cellValues[2];
    const rows: RowElement[] = [];
    for (let i = 4; i < cellValues.length; i += 4) {
        const row: RowElement = {
            sequence: i,
            key: cellValues[i],
            columnName: cellValues[i + 1],
            type: cellValues[i + 2],
            comment: BLANK,
        };
        rows.push(row);
    }

    return {
        title: title,
        rows: rows,
    };
}
