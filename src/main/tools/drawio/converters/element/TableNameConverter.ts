import { BLANK } from "../../../contants";
import Converter from "../Converter";
import { NotExistDotInTableTitleFailure, NotExistTableTitleFailure } from "./failures";
import { TableNameConvertResult } from "./models";

export default class TableNameConverter implements Converter<string, TableNameConvertResult> {
    convert(title: string): TableNameConvertResult {
        const regexResult = title.match(/>(.*?)</);
        if (!regexResult) {
            return TableNameConvertResult.ofFail(new NotExistTableTitleFailure());
        }

        const tableSchemaAndName = regexResult[1];
        if (tableSchemaAndName === BLANK) {
            return TableNameConvertResult.ofFail(new NotExistTableTitleFailure());
        }
        if (!tableSchemaAndName.includes(".")) {
            return TableNameConvertResult.ofFail(new NotExistDotInTableTitleFailure());
        }

        const schema = tableSchemaAndName.split(".")[0];
        const name = tableSchemaAndName.split(".")[1];
        return TableNameConvertResult.ofSuccess(schema, name);
    }
}
