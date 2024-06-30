import Failure from "../../../Failure";

export class DuplicatedPrimaryKeyFailure extends Failure {
    constructor() {
        super("duplicated primary key");
    }
}

export class NotSupportedKeyFailure extends Failure {
    constructor(word: string) {
        super("not supported key : " + word);
    }
}

export class NotExistTypeFailure extends Failure {
    constructor() {
        super("type is not exists");
    }
}

export class NotSupportedTypeFailure extends Failure {
    constructor(word: string) {
        super("not supported type : " + word);
    }
}
