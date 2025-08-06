import { BLANK, DOT } from "../../../constants";
import Converter from "../Converter";
import {
    NotExistDotInTableTitleFailure,
    NotExistTableTitleFailure,
} from "./failures";
import { TableNameConvertResult } from "./models";

export default class TableNameConverter
    implements Converter<string, TableNameConvertResult>
{
    convert(title: string): TableNameConvertResult {
        const regexResults = Array.from(title.matchAll(/>(.*?)</g))
            .map((matchedResults) => matchedResults[1])
            .filter((matchedText) => matchedText);
        if (!regexResults) {
            return TableNameConvertResult.ofFail(
                new NotExistTableTitleFailure()
            );
        }

        const tableSchemaAndName = regexResults.join(BLANK);
        if (tableSchemaAndName === BLANK) {
            return TableNameConvertResult.ofFail(
                new NotExistTableTitleFailure()
            );
        }
        if (!tableSchemaAndName.includes(DOT)) {
            return TableNameConvertResult.ofFail(
                new NotExistDotInTableTitleFailure()
            );
        }

        const schema = tableSchemaAndName.split(DOT)[0];
        const name = tableSchemaAndName.split(DOT)[1];
        return TableNameConvertResult.ofSuccess(schema, name);
    }
}
