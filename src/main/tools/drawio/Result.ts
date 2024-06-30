import Failure from "./Failure";

export default class Result {
    isSuccess: boolean;
    failures: Failure[];

    protected constructor(isSuccess: boolean, failures: Failure[]) {
        this.isSuccess = isSuccess;
        this.failures = failures;
    }
}
