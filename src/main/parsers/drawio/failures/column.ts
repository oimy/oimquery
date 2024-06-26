import { Failure } from "./faliure";

export class NotExistColumnNameFailure extends Failure {
    constructor() {
        super("column name is not exists");
    }
}

export class NotOnlyOnePrimaryColumnNamesFailure extends Failure {
    constructor(columnNames: string[]) {
        super(`primary column name is not only one, but ${columnNames}`);
    }
}

export class TryConversionByFailedParseResultFailure extends Failure {
    constructor() {
        super(`try conversion by failed parse results`);
    }
}

export class DuplicatedColumnNameFailure extends Failure {
    constructor(columnName: string) {
        super(`duplicated column name : ${columnName}`);
    }
}
