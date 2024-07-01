import Failure from "../Failure";

export class NotSupportedTextFailure extends Failure {
    constructor() {
        super("not supported text");
    }
}

export class InsufficientRowsFailure extends Failure {
    constructor() {
        super("rows is insufficient");
    }
}

export class NotSupportedTemplateFailure extends Failure {
    constructor(message?: string) {
        super("not supported template" + (message ? ` ${message}` : ""));
    }
}
