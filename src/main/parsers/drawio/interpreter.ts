import { COMMA, NULLABLE } from "../../contants";
import { dataTypes } from "../../models/type";
import { Failure } from "./failures/faliure";
import { NotSupportedKeyFailure, NotSupportedTypeFailure } from "./failures/interpreter";
import { RowElement } from "./template";

type WordType = "primary" | "unique" | "index" | "name" | "type" | "none";

interface Interpreter {
    failures: Failure[];

    identify(word: string): WordType | null;
    interpret(rowElement: RowElement): void;
}

export interface TableKey {
    index: number;
    columnName: string;
}

export class KeyInterpreter implements Interpreter {
    failures: Failure[] = [];

    isPrimary: boolean = false;
    isUnique: boolean = false;
    uniqueKeyIndexes: number[] = [];
    indexKeyIndexes: number[] = [];

    identify(word: string): WordType | null {
        const lowerWord = word.toLowerCase();
        if (lowerWord === "pk") {
            return "primary";
        } else if (/uk[0-9]+$/.test(lowerWord)) {
            return "unique";
        } else if (/idx[0-9]+$/.test(lowerWord)) {
            return "index";
        }
        return null;
    }

    private interpretOne(word: string, rowElement: RowElement): void {
        const keyType = this.identify(word);
        if (keyType === null) {
            this.failures.push(new NotSupportedKeyFailure(word));
            return;
        }
        if (keyType === "primary") {
            this.isPrimary = true;
        }
        if (keyType === "unique") {
            this.uniqueKeyIndexes.push(parseInt(word.toLowerCase().replace("uk", "")));
        }
        if (keyType === "index") {
            this.indexKeyIndexes.push(parseInt(word.toLowerCase().replace("idx", "")));
        }
    }

    interpret(rowElement: RowElement): void {
        if (rowElement.key === "") {
            return;
        }
        const words = rowElement.key.split(COMMA);
        words.forEach((word) => this.interpretOne(word, rowElement));
    }
}

export class TypeInterpreter implements Interpreter {
    failures: Failure[] = [];

    type: string = "";
    nullable: boolean = false;

    identify(word: string): WordType | null {
        for (const predefinedType of dataTypes) {
            if (word.startsWith(predefinedType)) {
                return "type";
            }
        }

        return null;
    }

    interpret(rowElement: RowElement): void {
        const keyType = this.identify(rowElement.type);
        if (keyType === null) {
            this.failures.push(new NotSupportedTypeFailure(rowElement.type));
        }

        if (rowElement.type.endsWith(NULLABLE)) {
            this.nullable = true;
        }
        this.type = rowElement.type.replace(NULLABLE, "");
    }
}
