import { BLANK } from "../../../contants";
import Failure from "../../Failure";
import Result from "../../Result";

export interface RowElement {
    sequence: number;
    key: string;
    columnName: string;
    type: string;
    comment: string;
}

export class TemplateConvertResult extends Result {
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
        return new TemplateConvertResult(title, rows, true, []);
    }

    static ofFail(failures: Failure[]) {
        return new TemplateConvertResult(BLANK, [], false, failures);
    }

    static ofOneFail(failure: Failure) {
        return new TemplateConvertResult(BLANK, [], false, [failure]);
    }
}
