import { Column } from "../../models/column";
import {
    DuplicatedColumnNameFailure,
    NotExistColumnNameFailure,
    NotOnlyOnePrimaryColumnNamesFailure,
    TryConversionByFailedParseResultFailure,
} from "./failures/column";
import { Failure } from "./failures/faliure";
import { KeyInterpreter, TypeInterpreter } from "./interpreter";
import { RowElement } from "./template";

export class ColumnParseResult {
    name: string;
    type: string;
    sequence: number;
    comment: string;
    isNullable: boolean;
    isPrimary: boolean;
    uniqueKeyIndexes: number[];
    indexKeyIndexes: number[];

    failures: Failure[];
    isSuccess: boolean;

    private constructor(
        name: string,
        type: string,
        sequence: number,
        comment: string,
        isNullable: boolean,
        isPrimary: boolean,
        uniqueKeyIndexes: number[],
        indexKeyIndexes: number[],
        failures: Failure[],
        isSuccess: boolean
    ) {
        this.name = name;
        this.type = type;
        this.sequence = sequence;
        this.comment = comment;
        this.isNullable = isNullable;
        this.isPrimary = isPrimary;
        this.uniqueKeyIndexes = uniqueKeyIndexes;
        this.indexKeyIndexes = indexKeyIndexes;
        this.failures = failures;
        this.isSuccess = isSuccess;
    }

    static ofSuccess(
        name: string,
        type: string,
        sequence: number,
        comment: string,
        isNullable: boolean,
        isPrimary: boolean,
        uniqueKeyIndexes: number[],
        indexKeyIndexes: number[]
    ) {
        return new ColumnParseResult(
            name,
            type,
            sequence,
            comment,
            isNullable,
            isPrimary,
            uniqueKeyIndexes,
            indexKeyIndexes,
            [],
            true
        );
    }

    static ofFail(failures: Failure[]) {
        return new ColumnParseResult("", "", -1, "", false, false, [], [], failures, false);
    }
}

export function parseColumn(rowElement: RowElement): ColumnParseResult {
    if (rowElement.columnName === "") {
        return ColumnParseResult.ofFail([new NotExistColumnNameFailure()]);
    }

    const keyInterpreter = new KeyInterpreter();
    keyInterpreter.interpret(rowElement);

    const typeInterpreter = new TypeInterpreter();
    typeInterpreter.interpret(rowElement);

    if (keyInterpreter.failures.length > 0 || typeInterpreter.failures.length > 0) {
        return ColumnParseResult.ofFail(keyInterpreter.failures.concat(typeInterpreter.failures));
    }

    return ColumnParseResult.ofSuccess(
        rowElement.columnName,
        typeInterpreter.type,
        rowElement.sequence,
        rowElement.comment,
        typeInterpreter.nullable,
        keyInterpreter.isPrimary,
        keyInterpreter.uniqueKeyIndexes,
        keyInterpreter.indexKeyIndexes
    );
}

export class ColumnConvertResult {
    columns: Column[];
    primaryKeyColumnName: string;
    uniqueKeyIndexAndColumnNamesMap: Record<number, string[]>;
    indexKeyIndexAndColumnNamesMap: Record<number, string[]>;

    failures: Failure[];
    isSuccess: boolean;

    private constructor(
        columns: Column[],
        primaryKeyColumnName: string,
        uniqueKeyIndexAndColumnNamesMap: Record<number, string[]>,
        indexKeyIndexAndColumnNamesMap: Record<number, string[]>,
        failures: Failure[],
        isSuccess: boolean
    ) {
        this.columns = columns;
        this.primaryKeyColumnName = primaryKeyColumnName;
        this.uniqueKeyIndexAndColumnNamesMap = uniqueKeyIndexAndColumnNamesMap;
        this.indexKeyIndexAndColumnNamesMap = indexKeyIndexAndColumnNamesMap;
        this.failures = failures;
        this.isSuccess = isSuccess;
    }

    static ofSuccess(
        columns: Column[],
        primaryKeyColumnName: string,
        uniqueKeyIndexAndColumnNamesMap: Record<number, string[]>,
        indexKeyIndexAndColumnNamesMap: Record<number, string[]>
    ) {
        return new ColumnConvertResult(
            columns,
            primaryKeyColumnName,
            uniqueKeyIndexAndColumnNamesMap,
            indexKeyIndexAndColumnNamesMap,
            [],
            true
        );
    }

    static ofFail(failures: Failure[]) {
        return new ColumnConvertResult([], "", {}, {}, failures, false);
    }
}

export function convertColumnParseResults(parseResults: ColumnParseResult[]) {
    const columns: Column[] = [];
    const visitedColumnNames: string[] = [];
    let primaryKeyColumnName: string = "";
    const uniqueKeyIndexAndColumnNamesMap: Record<number, string[]> = {};
    const indexKeyIndexAndColumnNamesMap: Record<number, string[]> = {};

    const failures: Failure[] = [];

    for (const parseResult of parseResults) {
        if (!parseResult.isSuccess) {
            failures.push(new TryConversionByFailedParseResultFailure());
            continue;
        }
        if (visitedColumnNames.includes(parseResult.name)) {
            failures.push(new DuplicatedColumnNameFailure(parseResult.name));
            continue;
        }

        if (parseResult.isPrimary) {
            if (primaryKeyColumnName !== "") {
                failures.push(
                    new NotOnlyOnePrimaryColumnNamesFailure([
                        primaryKeyColumnName,
                        parseResult.name,
                    ])
                );
                continue;
            }
            primaryKeyColumnName = parseResult.name;
        }

        parseResult.uniqueKeyIndexes.forEach((uniqueKeyIndex) => {
            if (!uniqueKeyIndexAndColumnNamesMap[uniqueKeyIndex]) {
                uniqueKeyIndexAndColumnNamesMap[uniqueKeyIndex] = [];
            }
            uniqueKeyIndexAndColumnNamesMap[uniqueKeyIndex].push(parseResult.name);
        });
        parseResult.indexKeyIndexes.forEach((indexKeyIndex) => {
            if (!indexKeyIndexAndColumnNamesMap[indexKeyIndex]) {
                indexKeyIndexAndColumnNamesMap[indexKeyIndex] = [];
            }
            indexKeyIndexAndColumnNamesMap[indexKeyIndex].push(parseResult.name);
        });

        columns.push({
            name: parseResult.name,
            dataType: parseResult.type,
            isNullable: parseResult.isNullable,
            comment: parseResult.comment,
            sequence: parseResult.sequence,
        });
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
