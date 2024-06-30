import { BLANK, NULLABLE } from "../../../../contants";
import { RowElement } from "../../template/models";
import Interpreter from "./Interpreter";
import { NotSupportedTypeFailure } from "./failures";
import { TypeInterpretResult } from "./models";

const NUMBER_DATA_TYPES: Readonly<string[]> = ["bigint", "integer", "smallint", "double"];
const STRING_DATA_TYPES: Readonly<string[]> = ["varchar", "nvarchar", "text"];
const BOOLEAN_DATA_TYPES: Readonly<string[]> = ["boolean", "tinyint"];
const JSON_DATA_TYPES: Readonly<string[]> = ["json"];
const DATE_DATA_TYPES: Readonly<string[]> = ["date", "datetime"];

export const DATA_TYPES: Readonly<string[]> = [
    NUMBER_DATA_TYPES,
    STRING_DATA_TYPES,
    BOOLEAN_DATA_TYPES,
    JSON_DATA_TYPES,
    DATE_DATA_TYPES,
].flat();

export class TypeInterpreter implements Interpreter<TypeInterpretResult> {
    private checkDataType(word: string): boolean {
        for (const dataType of DATA_TYPES) {
            if (word.startsWith(dataType)) {
                return true;
            }
        }
        return false;
    }
    interpret(rowElement: RowElement): TypeInterpretResult {
        if (!this.checkDataType(rowElement.type)) {
            return TypeInterpretResult.ofFail([new NotSupportedTypeFailure(rowElement.type)]);
        }

        let nullable: boolean = false;
        if (rowElement.type.endsWith(NULLABLE)) {
            nullable = true;
        }
        const type = rowElement.type.replace(NULLABLE, BLANK);
        return TypeInterpretResult.ofSuccess(type, nullable);
    }
}
