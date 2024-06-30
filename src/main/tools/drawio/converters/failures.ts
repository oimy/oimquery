import Failure from "../Failure";

export class TitleCellNotExistOrBlankFailure extends Failure {
    constructor() {
        super("blank title cell");
    }
}

export class InvalidTemplateFormatFailure extends Failure {
    constructor() {
        super("invalid template's format");
    }
}
