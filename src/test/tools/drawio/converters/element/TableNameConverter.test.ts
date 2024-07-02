import TableNameConverter from "../../../../../main/tools/drawio/converters/element/TableNameConverter";
import {
    NotExistDotInTableTitleFailure,
    NotExistTableTitleFailure,
} from "../../../../../main/tools/drawio/converters/element/failures";

describe("TableNameConverter convert is", () => {
    const converter = new TableNameConverter();

    it("expected one NotExistTableTitleFailure when given no title", () => {
        const givenTitle = "";

        const actualConvertResult = converter.convert(givenTitle);

        expect(actualConvertResult.isSuccess).toEqual(false);
        expect(actualConvertResult.failures).toEqual([new NotExistTableTitleFailure()]);
    });

    it("expected one NotExistTableTitleFailure when given blank title", () => {
        const givenTitle = "><";

        const actualConvertResult = converter.convert(givenTitle);

        expect(actualConvertResult.isSuccess).toEqual(false);
        expect(actualConvertResult.failures).toEqual([new NotExistTableTitleFailure()]);
    });

    it("expected one NotExistDotInTableTitleFailure when given title with no dot", () => {
        const givenTitle = ">playapples<";

        const actualConvertResult = converter.convert(givenTitle);

        expect(actualConvertResult.isSuccess).toEqual(false);
        expect(actualConvertResult.failures).toEqual([new NotExistDotInTableTitleFailure()]);
    });

    it("expected schema and name when given valid title", () => {
        const givenSchema = "ploy";
        const givenName = "apples";
        const givenTitle = `>${givenSchema}.${givenName}<`;

        const actualConvertResult = converter.convert(givenTitle);

        expect(actualConvertResult.isSuccess).toEqual(true);
        expect(actualConvertResult.failures).toEqual([]);
        expect(actualConvertResult.schema).toEqual(givenSchema);
        expect(actualConvertResult.name).toEqual(givenName);
    });

    it("export schema and name when given separated title", () => {
        const givenSchema = "ploy";
        const givenName = "apples";
        const givenTitle = `<span style="color: rgb(255, 255, 255);">${givenSchema}</span><font color="#ffffff">.${givenName}</font>`;

        const actualConvertResult = converter.convert(givenTitle);

        expect(actualConvertResult.isSuccess).toEqual(true);
        expect(actualConvertResult.failures).toEqual([]);
        expect(actualConvertResult.schema).toEqual(givenSchema);
        expect(actualConvertResult.name).toEqual(givenName);
    });
});
