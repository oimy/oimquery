import Failure from "../../../Failure";
import Result from "../../../Result";

export type WordType = "primary" | "unique" | "index" | "name" | "type" | "none";

export class KeyInterpretResult extends Result {
    isPrimary: boolean = false;
    uniqueKeyIndexes: number[] = [];
    indexKeyIndexes: number[] = [];
    foreignKeyIndexes: number[] = [];

    private constructor(
        isPrimary: boolean,
        uniqueKeyIndexes: number[],
        indexKeyIndexes: number[],
        foreignKeyIndexes: number[],
        isSuccess: boolean,
        failures: Failure[]
    ) {
        super(isSuccess, failures);
        this.isPrimary = isPrimary;
        this.uniqueKeyIndexes = uniqueKeyIndexes;
        this.indexKeyIndexes = indexKeyIndexes;
        this.foreignKeyIndexes = foreignKeyIndexes;
    }

    static ofSuccess(
        isPrimary: boolean,
        uniqueKeyIndexes: number[],
        indexKeyIndexes: number[],
        foreignKeyIndexes: number[]
    ) {
        return new KeyInterpretResult(isPrimary, uniqueKeyIndexes, indexKeyIndexes, foreignKeyIndexes, true, []);
    }

    static ofFail(failures: Failure[]) {
        return new KeyInterpretResult(false, [], [], [], false, failures);
    }
}

export class TypeInterpretResult extends Result {
    type: string;
    nullable: boolean;

    private constructor(type: string, nullable: boolean, isSuccess: boolean, failures: Failure[]) {
        super(isSuccess, failures);
        this.type = type;
        this.nullable = nullable;
    }

    static ofSuccess(type: string, nullable: boolean) {
        return new TypeInterpretResult(type, nullable, true, []);
    }

    static ofFail(failures: Failure[]) {
        return new TypeInterpretResult("", false, false, failures);
    }
}
