import { BLANK } from "../../contants";
import Failure from "../Failure";
import Result from "../Result";
import { RowElement } from "../converters/template/models";

export class TableElementParseResult extends Result {
    title: string;
    rows: RowElement[];

    private constructor(
        title: string,
        rows: RowElement[],
        isSuccess: boolean,
        failures: Failure[]
    ) {
        super(isSuccess, failures);
        this.title = title;
        this.rows = rows;
    }

    static ofSuccess(title: string, rows: RowElement[]) {
        return new TableElementParseResult(title, rows, true, []);
    }

    static ofFail(failures: Failure[]) {
        return new TableElementParseResult(BLANK, [], false, failures);
    }
}

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
