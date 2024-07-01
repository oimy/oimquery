import fs from "fs";
import path from "path";
import { TitleCellNotExistOrBlankFailure } from "../../../../main/tools/drawio/converters/failures";
import SimpleTableElementParser from "../../../../main/tools/drawio/parsers/SimpleTableElementParser";
import {
    InsufficientRowsFailure,
    NotSupportedTemplateFailure,
    NotSupportedTextFailure,
} from "../../../../main/tools/drawio/parsers/failures";

describe("SimpleTableElementParser parse is", () => {
    const parser = new SimpleTableElementParser();

    it("expected one NotSupportedTextFailure when not given '<mxGraphModel>' in text", () => {
        const givenTableElementText = `
        hello world!
        `;

        const actualParseResult = parser.parse(givenTableElementText);

        expect(actualParseResult.failures).toEqual([new NotSupportedTextFailure()]);
    });

    it("expected one NotSupportedTemplateFailure when not given predefined template html", () => {
        const givenTableElementText = `
<mxgraphmodel>
    <root>
        <mxcell id="0">
            <mxcell id="1" parent="0">
                <mxcell
                        id="2" value="<font color=&quot;#ffffff&quot;>ploy.apples</font>"
                        style="shape=table;startSize=30;container=1;collapsible=1;childLayout=tableLayout;fixedRows=1;rowLines=0;fontStyle=1;align=center;resizeLast=1;html=1;backgroundOutline=0;fillColor=#333333;strokeColor=#4D4D4D;"
                        vertex="1" parent="1"
                >
                    <mxgeometry x="-798" y="160" width="180" height="60" as="geometry"></mxgeometry>
                </mxcell>
                <mxcell
                        id="3"
                        style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;fillColor=none;collapsible=0;dropTarget=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;top=0;left=0;right=0;bottom=0;"
                        vertex="1" parent="2"
                >
                    <mxgeometry y="30" width="180" height="30" as="geometry"></mxgeometry>
                </mxcell>
            </mxcell>
        </mxcell>
    </root>
</mxgraphmodel>
        `;

        const actualParseResult = parser.parse(givenTableElementText);

        expect(actualParseResult.failures).toEqual([new InsufficientRowsFailure()]);
    });

    it("expected one NotSupportedTemplateFailure when given a template with short of column", () => {
        const givenTableElementText = fs
            .readFileSync(path.join(__dirname, "resources/column-two-template-0"))
            .toString();

        const actualParseResult = parser.parse(givenTableElementText);

        expect(actualParseResult.failures).toEqual([
            new NotSupportedTemplateFailure("not supported column count 2"),
        ]);
    });

    it("expected one NotSupportedTemplateFailure when given a template with exceed of column", () => {
        const givenTableElementText = fs
            .readFileSync(path.join(__dirname, "resources/column-five-template-0"))
            .toString();

        const actualParseResult = parser.parse(givenTableElementText);

        expect(actualParseResult.failures).toEqual([
            new NotSupportedTemplateFailure("not supported column count 5"),
        ]);
    });

    it("expected one TitleCellNotExistOrBlankFailure when given a blank title", () => {
        const givenTableElementText = fs
            .readFileSync(path.join(__dirname, "resources/blank-title-template-0"))
            .toString();

        const actualParseResult = parser.parse(givenTableElementText);

        expect(actualParseResult.failures).toEqual([new TitleCellNotExistOrBlankFailure()]);
    });

    it("expected succeed with all blank comment when given a valid template with 3 columns", () => {
        const givenTableElementText = fs
            .readFileSync(path.join(__dirname, "resources/column-three-template-0"))
            .toString();

        const actualParseResult = parser.parse(givenTableElementText);

        expect(actualParseResult.failures).toEqual([]);
        expect(actualParseResult.title).toEqual('<font color="#ffffff">ploy.apples</font>');
        expect(actualParseResult.rows).toEqual([
            {
                sequence: 4,
                key: "PK",
                columnName: "srl",
                type: "bigint",
                comment: "",
            },
            {
                sequence: 8,
                key: "UK1",
                columnName: "price",
                type: "integer",
                comment: "",
            },
            {
                sequence: 12,
                key: "IDX1",
                columnName: "qualityLevel",
                type: "smallint",
                comment: "",
            },
            {
                sequence: 16,
                key: "IDX1,IDX2",
                columnName: "weight",
                type: "double",
                comment: "",
            },
            {
                sequence: 20,
                key: "UK2",
                columnName: "shippingCode",
                type: "varchar(16)",
                comment: "",
            },
            {
                sequence: 24,
                key: "UK2,UK3",
                columnName: "origin",
                type: "nvarchar(64)",
                comment: "",
            },
            {
                sequence: 28,
                key: "UK3",
                columnName: "comment",
                type: "text?",
                comment: "",
            },
            {
                sequence: 32,
                key: "",
                columnName: "ripened",
                type: "boolean",
                comment: "",
            },
            {
                sequence: 36,
                key: "",
                columnName: "rotten",
                type: "tinyint(1)",
                comment: "",
            },
            {
                sequence: 40,
                key: "",
                columnName: "descriptions",
                type: "json",
                comment: "",
            },
            {
                sequence: 44,
                key: "",
                columnName: "harvestedAt",
                type: "datetime(6)",
                comment: "",
            },
            {
                sequence: 48,
                key: "",
                columnName: "packagedDate",
                type: "date",
                comment: "",
            },
        ]);
    });

    it("expected succeed with comment when given a valid template with 4 columns", () => {
        const givenTableElementText = fs
            .readFileSync(path.join(__dirname, "resources/column-four-template-0"))
            .toString();

        const actualParseResult = parser.parse(givenTableElementText);

        expect(actualParseResult.failures).toEqual([]);
        expect(actualParseResult.title).toEqual('<font color="#ffffff">ploy.apples</font>');
        expect(actualParseResult.rows).toEqual([
            {
                sequence: 4,
                key: "PK",
                columnName: "srl",
                type: "bigint",
                comment: "primary key",
            },
            {
                sequence: 9,
                key: "UK1",
                columnName: "price",
                type: "integer",
                comment: "",
            },
            {
                sequence: 14,
                key: "IDX1",
                columnName: "qualityLevel",
                type: "smallint",
                comment: "",
            },
            {
                sequence: 19,
                key: "IDX1,IDX2",
                columnName: "weight",
                type: "double",
                comment: "weight in gram",
            },
            {
                sequence: 24,
                key: "UK2",
                columnName: "shippingCode",
                type: "varchar(16)",
                comment: "shipping code",
            },
            {
                sequence: 29,
                key: "UK2,UK3",
                columnName: "origin",
                type: "nvarchar(64)",
                comment: "source",
            },
            {
                sequence: 34,
                key: "UK3",
                columnName: "comment",
                type: "text?",
                comment: "comment",
            },
            {
                sequence: 39,
                key: "",
                columnName: "ripened",
                type: "boolean",
                comment: "is it ripened",
            },
            {
                sequence: 44,
                key: "",
                columnName: "rotten",
                type: "tinyint(1)",
                comment: "is it rotten",
            },
            {
                sequence: 49,
                key: "",
                columnName: "descriptions",
                type: "json",
                comment: "descriptions",
            },
            {
                sequence: 54,
                key: "",
                columnName: "harvestedAt",
                type: "datetime(6)",
                comment: "harvest datetime",
            },
            {
                sequence: 59,
                key: "",
                columnName: "packagedDate",
                type: "date",
                comment: "package date",
            },
        ]);
    });
});
