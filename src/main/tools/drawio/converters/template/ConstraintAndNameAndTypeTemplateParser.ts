import { BLANK } from "../../../contants";
import { InvalidTemplateFormatFailure, TitleCellNotExistOrBlankFailure } from "../failures";
import { RowElement, TemplateConvertResult } from "./models";
import TemplateConverter from "./TemplateConverter";

export default class ConstraintAndNameAndTypeTemplateConverter implements TemplateConverter {
    convert(cellValues: string[]): TemplateConvertResult {
        const title: string = cellValues[2];
        if (title === BLANK) {
            return TemplateConvertResult.ofFail([new TitleCellNotExistOrBlankFailure()]);
        }

        const rows: RowElement[] = [];
        try {
            for (let i = 4; i < cellValues.length; i += 4) {
                const row: RowElement = {
                    sequence: i,
                    key: cellValues[i],
                    columnName: cellValues[i + 1],
                    type: cellValues[i + 2],
                    comment: BLANK,
                };
                rows.push(row);
            }
        } catch (e) {
            return TemplateConvertResult.ofFail([new InvalidTemplateFormatFailure()]);
        }

        return TemplateConvertResult.ofSuccess(title, rows);
    }
}
