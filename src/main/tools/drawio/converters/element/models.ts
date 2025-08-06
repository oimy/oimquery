import { Column } from "../../../../components/toast/models/column";
import { BLANK } from "../../../constants";
import Failure from "../../Failure";
import Result from "../../Result";

export class TableNameConvertResult extends Result {
    schema: string;
    name: string;

    private constructor(
        schema: string,
        name: string,
        failures: Failure[],
        isSuccess: boolean
    ) {
        super(isSuccess, failures);
        this.schema = schema;
        this.name = name;
    }

    static ofSuccess(schema: string, name: string) {
        return new TableNameConvertResult(schema, name, [], true);
    }

    static ofFail(failure: Failure) {
        return new TableNameConvertResult(BLANK, BLANK, [failure], false);
    }
}

export class ColumnConvertResult extends Result {
    columns: Column[];
    primaryKeyColumnName: string;
    uniqueKeyIndexAndColumnNamesMap: Record<number, string[]>;
    indexKeyIndexAndColumnNamesMap: Record<number, string[]>;

    private constructor(
        columns: Column[],
        primaryKeyColumnName: string,
        uniqueKeyIndexAndColumnNamesMap: Record<number, string[]>,
        indexKeyIndexAndColumnNamesMap: Record<number, string[]>,
        failures: Failure[],
        isSuccess: boolean
    ) {
        super(isSuccess, failures);
        this.columns = columns;
        this.primaryKeyColumnName = primaryKeyColumnName;
        this.uniqueKeyIndexAndColumnNamesMap = uniqueKeyIndexAndColumnNamesMap;
        this.indexKeyIndexAndColumnNamesMap = indexKeyIndexAndColumnNamesMap;
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
