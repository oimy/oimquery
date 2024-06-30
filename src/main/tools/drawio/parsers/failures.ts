import Failure from "../Failure";

export class NotSupportedTextFailure extends Failure {
    constructor() {
        super("not supported text");
    }
}

export class InvalidHtmlTextFailure extends Failure {
    constructor() {
        super("invalid html text");
    }
}

export class LackOfCellValuesFailures extends Failure {
    constructor(minimumLength: number) {
        super("lack of cell values, it must be at least " + minimumLength);
    }
}
