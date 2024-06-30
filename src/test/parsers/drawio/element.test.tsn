import fs from "fs";
import { parseTableElementTextToTableElement } from "../../../main/parsers/drawio/element";

describe("parseTableElement function", () => {
    it("should get valid parse result", () => {
        const givenFilePath =
            "src/test/parsers/drawio/resources/table-constaint-name-type-comment-apple-01";
        const givenTableElementText = fs.readFileSync(givenFilePath).toString();

        const tableElement = parseTableElementTextToTableElement(givenTableElementText);

        expect(tableElement.title).toBe('<font color="#ffffff">ploy.apples</font>');
        expect(tableElement.rows.length).toBe(12);
    });
});
