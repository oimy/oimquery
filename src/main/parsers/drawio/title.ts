import { BLANK } from "../../contants";
import { Failure } from "./failures/faliure";
import { NotExistDotInTableTitleFailure, NotExistTableTitleFailure } from "./failures/title";

export class TitleParseResult {
    schema: string;
    name: string;

    failures: Failure[];
    isSuccess: boolean;

    private constructor(schema: string, name: string, failures: Failure[], isSuccess: boolean) {
        this.schema = schema;
        this.name = name;
        this.failures = failures;
        this.isSuccess = isSuccess;
    }

    static ofSuccess(schema: string, name: string) {
        return new TitleParseResult(schema, name, [], true);
    }

    static ofFail(failures: Failure[]) {
        return new TitleParseResult(BLANK, BLANK, failures, false);
    }
}

export function parseTableTitle(title: string): TitleParseResult {
    const regexResult = title.match(/>(.*?)</);
    if (!regexResult) {
        return TitleParseResult.ofFail([new NotExistTableTitleFailure()]);
    }

    const tableSchemaAndName = regexResult[1];
    if (tableSchemaAndName === BLANK) {
        return TitleParseResult.ofFail([new NotExistTableTitleFailure()]);
    }
    if (!tableSchemaAndName.includes(".")) {
        return TitleParseResult.ofFail([new NotExistDotInTableTitleFailure()]);
    }

    const schema = tableSchemaAndName.split(".")[0];
    const name = tableSchemaAndName.split(".")[1];
    return TitleParseResult.ofSuccess(schema, name);
}
