import fs from "fs";
import { parseColumn } from "../../../main/parsers/drawio/column";
import { parseTableElementTextToTableElement } from "../../../main/parsers/drawio/element";

describe("parseColumn function", () => {
    it("should get valid parse result when given valid full table element", () => {
        const givenFilePath =
            "src/test/parsers/drawio/resources/table-constaint-name-type-comment-apple-01";
        const givenTableElementText = fs.readFileSync(givenFilePath).toString();
        const givenTableElement = parseTableElementTextToTableElement(givenTableElementText);

        givenTableElement.rows.forEach((rowElement) => {
            const actualColumnParseResult = parseColumn(rowElement);
            expect(actualColumnParseResult.isSuccess).toBeTruthy();
        });
    });
});
