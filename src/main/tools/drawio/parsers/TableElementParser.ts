import Parser from "./Parser";
import { TableElementParseResult } from "./models";

export default interface TableElementParser extends Parser<TableElementParseResult> {
    parse(tableElementText: string): TableElementParseResult;
}
