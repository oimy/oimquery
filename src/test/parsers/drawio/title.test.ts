import {
    NotExistDotInTableTitleFailure,
    NotExistTableTitleFailure,
} from "../../../main/parsers/drawio/failures/title";
import { TitleParseResult, parseTableTitle } from "../../../main/parsers/drawio/title";

describe("parseTableTitle function", () => {
    it("should return NotExistTableNameFailure when given blank", () => {
        const givenBlankTitle = "";

        const actualTitleParseResult = parseTableTitle(givenBlankTitle);

        expect(actualTitleParseResult.isSuccess).toBeFalsy();
        expect(actualTitleParseResult.failures.length).toBe(1);
        expect(actualTitleParseResult.failures[0]).toBeInstanceOf(NotExistTableTitleFailure);
    });
    it("should return NotExistTableNameFailure when given '><'", () => {
        const givenNoNameTitle = "><";

        const actualTitleParseResult = parseTableTitle(givenNoNameTitle);

        expect(actualTitleParseResult.isSuccess).toBeFalsy();
        expect(actualTitleParseResult.failures.length).toBe(1);
        expect(actualTitleParseResult.failures[0]).toBeInstanceOf(NotExistTableTitleFailure);
    });
    it("should return NotExistDotInTableDefinitionFailure when not exist dot in definition", () => {
        const givenNoDotTitle = ">helloworld<";

        const actualTitleParseResult = parseTableTitle(givenNoDotTitle);

        expect(actualTitleParseResult.isSuccess).toBeFalsy();
        expect(actualTitleParseResult.failures.length).toBe(1);
        expect(actualTitleParseResult.failures[0]).toBeInstanceOf(NotExistDotInTableTitleFailure);
    });
    it("should return a valid Table object when title contains table schema and name", () => {
        const givenValidSchema = "hello";
        const givenValidName = "world";
        const givenValidTitle = `>${givenValidSchema}.${givenValidName}<`;

        const actualTitleParseResult: TitleParseResult = parseTableTitle(givenValidTitle);
        expect(actualTitleParseResult.isSuccess).toBeTruthy();
        expect(actualTitleParseResult.schema).toBe(givenValidSchema);
        expect(actualTitleParseResult.name).toBe(givenValidName);
    });
});
