import { Failure } from "./faliure";

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
