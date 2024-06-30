import Failure from "../../Failure";

export class NotExistTableTitleFailure extends Failure {
    constructor() {
        super("table's title is not exists");
    }
}

export class NotExistDotInTableTitleFailure extends Failure {
    constructor() {
        super("dot(.) is need to distinguish schema and name. but it is not exists. ");
    }
}

export class NotExistColumnNameFailure extends Failure {
    constructor() {
        super("column name is not exists");
    }
}

export class NotOnlyOnePrimaryColumnNameFailure extends Failure {
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
