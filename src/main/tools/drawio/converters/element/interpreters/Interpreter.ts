import Result from "../../../Result";
import { RowElement } from "../../template/models";

export default interface Interpreter<R extends Result> {
    interpret(rowElement: RowElement): R;
}
