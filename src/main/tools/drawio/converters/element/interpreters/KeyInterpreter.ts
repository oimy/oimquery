import { BLANK, COMMA } from "../../../../contants";
import Failure from "../../../Failure";
import { RowElement } from "../../template/models";
import Interpreter from "./Interpreter";
import { NotSupportedKeyFailure } from "./failures";
import { KeyInterpretResult } from "./models";

type KeyType = "primary" | "unique" | "index";

export default class KeyInterpreter implements Interpreter<KeyInterpretResult> {
    private identifyType(word: string): KeyType | null {
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

    private interpretOne(key: string): KeyInterpretResult {
        const keyType: KeyType | null = this.identifyType(key);
        if (keyType === null) {
            return KeyInterpretResult.ofFail([new NotSupportedKeyFailure(key)]);
        }

        let isPrimary: boolean = false;
        const uniqueKeyIndexes: number[] = [];
        const indexKeyIndexes: number[] = [];

        if (keyType === "primary") {
            isPrimary = true;
        }
        if (keyType === "unique") {
            uniqueKeyIndexes.push(parseInt(key.toLowerCase().replace("uk", "")));
        }
        if (keyType === "index") {
            indexKeyIndexes.push(parseInt(key.toLowerCase().replace("idx", "")));
        }
        return KeyInterpretResult.ofSuccess(isPrimary, uniqueKeyIndexes, indexKeyIndexes);
    }

    interpret(rowElement: RowElement): KeyInterpretResult {
        let isPrimary: boolean = false;
        const uniqueKeyIndexes: number[] = [];
        const indexKeyIndexes: number[] = [];
        const failures: Failure[] = [];

        if (rowElement.key === BLANK) {
            return KeyInterpretResult.ofSuccess(isPrimary, uniqueKeyIndexes, indexKeyIndexes);
        }

        const keys = rowElement.key.split(COMMA);
        keys.forEach((key) => {
            const result = this.interpretOne(key);
            if (!result.isSuccess) {
                failures.push(...result.failures);
                return;
            }

            if (result.isPrimary) {
                isPrimary = true;
            }
            uniqueKeyIndexes.push(...result.uniqueKeyIndexes);
            indexKeyIndexes.push(...result.indexKeyIndexes);
        });

        if (failures.length > 0) {
            return KeyInterpretResult.ofFail(failures);
        }
        return KeyInterpretResult.ofSuccess(isPrimary, uniqueKeyIndexes, indexKeyIndexes);
    }
}
