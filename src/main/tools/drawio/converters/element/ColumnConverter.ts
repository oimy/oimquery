import { Column } from "../../../../components/toast/models/column";
import { BLANK } from "../../../contants";
import Failure from "../../Failure";
import Converter from "../Converter";
import { RowElement } from "../template/models";
import {
    DuplicatedColumnNameFailure,
    NotExistColumnNameFailure,
    NotExistPrimaryKeyFailure,
    NotOnlyOnePrimaryColumnNameFailure,
} from "./failures";
import KeyInterpreter from "./interpreters/KeyInterpreter";
import { TypeInterpreter } from "./interpreters/TypeInterpreter";
import { ColumnConvertResult } from "./models";

const KEY_INTERPRETER = new KeyInterpreter();
const TYPE_INTERPRETER = new TypeInterpreter();

export default class ColumnConverter implements Converter<RowElement[], ColumnConvertResult> {
    convert(rowElements: RowElement[]): ColumnConvertResult {
        const columns: Column[] = [];
        const visitedColumnNames: string[] = [];

        let primaryKeyColumnName: string = BLANK;
        const uniqueKeyIndexAndColumnNamesMap: Record<number, string[]> = {};
        const indexKeyIndexAndColumnNamesMap: Record<number, string[]> = {};

        const failures: Failure[] = [];

        for (const rowElement of rowElements) {
            if (rowElement.columnName === BLANK) {
                failures.push(new NotExistColumnNameFailure());
                continue;
            }
            if (visitedColumnNames.includes(rowElement.columnName)) {
                failures.push(new DuplicatedColumnNameFailure(rowElement.columnName));
                continue;
            }

            const keyInterpretResult = KEY_INTERPRETER.interpret(rowElement);
            const typeInterpretResult = TYPE_INTERPRETER.interpret(rowElement);
            if (keyInterpretResult.failures.length > 0 || typeInterpretResult.failures.length > 0) {
                failures.push(...keyInterpretResult.failures.concat(typeInterpretResult.failures));
                continue;
            }

            if (keyInterpretResult.isPrimary) {
                if (primaryKeyColumnName !== BLANK) {
                    failures.push(
                        new NotOnlyOnePrimaryColumnNameFailure([
                            primaryKeyColumnName,
                            rowElement.columnName,
                        ])
                    );
                }
                primaryKeyColumnName = rowElement.columnName;
            }
            keyInterpretResult.uniqueKeyIndexes.forEach((uniqueKeyIndex) => {
                if (!uniqueKeyIndexAndColumnNamesMap[uniqueKeyIndex]) {
                    uniqueKeyIndexAndColumnNamesMap[uniqueKeyIndex] = [];
                }
                uniqueKeyIndexAndColumnNamesMap[uniqueKeyIndex].push(rowElement.columnName);
            });
            keyInterpretResult.indexKeyIndexes.forEach((indexKeyIndex) => {
                if (!indexKeyIndexAndColumnNamesMap[indexKeyIndex]) {
                    indexKeyIndexAndColumnNamesMap[indexKeyIndex] = [];
                }
                indexKeyIndexAndColumnNamesMap[indexKeyIndex].push(rowElement.columnName);
            });

            visitedColumnNames.push(rowElement.columnName);
            columns.push({
                name: rowElement.columnName,
                dataType: typeInterpretResult.type,
                isNullable: typeInterpretResult.nullable,
                comment: rowElement.comment,
                sequence: rowElement.sequence,
            });
        }

        if (primaryKeyColumnName === BLANK) {
            return ColumnConvertResult.ofFail([new NotExistPrimaryKeyFailure()]);
        }

        if (failures.length > 0) {
            return ColumnConvertResult.ofFail(failures);
        }
        return ColumnConvertResult.ofSuccess(
            columns,
            primaryKeyColumnName,
            uniqueKeyIndexAndColumnNamesMap,
            indexKeyIndexAndColumnNamesMap
        );
    }
}
