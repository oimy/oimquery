import { BLANK, NULLABLE } from "../../../../../main/tools/contants";
import ColumnConverter from "../../../../../main/tools/drawio/converters/element/ColumnConverter";
import {
    DuplicatedColumnNameFailure,
    NotExistColumnNameFailure,
    NotExistPrimaryKeyFailure,
    NotOnlyOnePrimaryColumnNameFailure,
} from "../../../../../main/tools/drawio/converters/element/failures";
import {
    NotSupportedKeyFailure,
    NotSupportedTypeFailure,
} from "../../../../../main/tools/drawio/converters/element/interpreters/failures";
import { RowElement } from "../../../../../main/tools/drawio/converters/template/models";

describe("ColumnConverter convert is", () => {
    const converter = new ColumnConverter();

    it("expect one NotExistColumnNameFailure when given one blank column name", () => {
        const givenRowElements: RowElement[] = [
            {
                sequence: 1,
                key: "PK",
                columnName: BLANK,
                type: "bigint",
                comment: "",
            },
        ];

        const actualConvertResult = converter.convert(givenRowElements);
        expect(actualConvertResult.isSuccess).toBeFalsy();
        expect(actualConvertResult.failures).toEqual([new NotExistColumnNameFailure()]);
    });

    it("expect two NotExistColumnNameFailures when given two blank column names", () => {
        const givenRowElements: RowElement[] = [
            {
                sequence: 1,
                key: "PK",
                columnName: "srl",
                type: "bigint",
                comment: "",
            },
            {
                sequence: 2,
                key: "",
                columnName: BLANK,
                type: "integer",
                comment: "",
            },
            {
                sequence: 3,
                key: "IDX1",
                columnName: BLANK,
                type: "varchar(128)",
                comment: "",
            },
        ];

        const actualConvertResult = converter.convert(givenRowElements);
        expect(actualConvertResult.isSuccess).toBeFalsy();
        expect(actualConvertResult.failures).toEqual([
            new NotExistColumnNameFailure(),
            new NotExistColumnNameFailure(),
        ]);
    });

    it("expect DuplicatedColumnNameFailure when given two equals column names", () => {
        const givenDuplicatedColumnName = "srl";
        const givenRowElements: RowElement[] = [
            {
                sequence: 1,
                key: "PK",
                columnName: givenDuplicatedColumnName,
                type: "bigint",
                comment: "",
            },
            {
                sequence: 2,
                key: "",
                columnName: givenDuplicatedColumnName,
                type: "integer",
                comment: "",
            },
            {
                sequence: 3,
                key: "IDX1",
                columnName: "expression",
                type: "varchar(128)",
                comment: "",
            },
        ];

        const actualConvertResult = converter.convert(givenRowElements);
        expect(actualConvertResult.isSuccess).toBeFalsy();
        expect(actualConvertResult.failures).toEqual([
            new DuplicatedColumnNameFailure(givenDuplicatedColumnName),
        ]);
    });

    it("expect NotOnlyOnePrimaryColumnNameFailure when given two primary key's column names", () => {
        const firstPrimaryColumnName = "srl";
        const secondPrimaryColumnName = "price";
        const givenRowElements: RowElement[] = [
            {
                sequence: 1,
                key: "PK",
                columnName: firstPrimaryColumnName,
                type: "bigint",
                comment: "",
            },
            {
                sequence: 2,
                key: "PK",
                columnName: secondPrimaryColumnName,
                type: "integer",
                comment: "",
            },
            {
                sequence: 3,
                key: "IDX1",
                columnName: "expression",
                type: "varchar(128)",
                comment: "",
            },
        ];

        const actualConvertResult = converter.convert(givenRowElements);

        expect(actualConvertResult.isSuccess).toBeFalsy();
        expect(actualConvertResult.failures).toEqual([
            new NotOnlyOnePrimaryColumnNameFailure([
                firstPrimaryColumnName,
                secondPrimaryColumnName,
            ]),
        ]);
    });

    it("expect NotExistPrimaryKeyFailure when given no primary key", () => {
        const givenRowElements: RowElement[] = [
            {
                sequence: 1,
                key: "",
                columnName: "srl",
                type: "bigint",
                comment: "",
            },
            {
                sequence: 2,
                key: "",
                columnName: "price",
                type: "integer",
                comment: "",
            },
            {
                sequence: 3,
                key: "IDX1",
                columnName: "expression",
                type: "varchar(128)",
                comment: "",
            },
        ];

        const actualConvertResult = converter.convert(givenRowElements);

        expect(actualConvertResult.isSuccess).toBeFalsy();
        expect(actualConvertResult.failures).toEqual([new NotExistPrimaryKeyFailure()]);
    });

    it("expect valid unique indexes when given unique key columns", () => {
        const givenRowElements = [
            {
                sequence: 1,
                key: "PK",
                columnName: "srl",
                type: "bigint",
                comment: "",
            },
            {
                sequence: 2,
                key: "UK1",
                columnName: "price",
                type: "integer",
                comment: "",
            },
            {
                sequence: 3,
                key: "UK2",
                columnName: "expression",
                type: "varchar(128)",
                comment: "",
            },
            {
                sequence: 4,
                key: "UK2,UK3",
                columnName: "weight",
                type: "double",
                comment: "",
            },
            {
                sequence: 5,
                key: "UK3",
                columnName: "ripened",
                type: "boolean",
                comment: "",
            },
        ];

        const actualConvertResult = converter.convert(givenRowElements);

        expect(actualConvertResult.isSuccess).toBeTruthy();
        expect(actualConvertResult.primaryKeyColumnName).toEqual("srl");
        expect(actualConvertResult.uniqueKeyIndexAndColumnNamesMap).toEqual({
            "1": ["price"],
            "2": ["expression", "weight"],
            "3": ["weight", "ripened"],
        });
        expect(actualConvertResult.indexKeyIndexAndColumnNamesMap).toEqual({});
    });

    it("expect valid index indexes when given index key columns", () => {
        const givenRowElements = [
            {
                sequence: 1,
                key: "PK",
                columnName: "srl",
                type: "bigint",
                comment: "",
            },
            {
                sequence: 2,
                key: "IDX1",
                columnName: "price",
                type: "integer",
                comment: "",
            },
            {
                sequence: 3,
                key: "IDX2",
                columnName: "expression",
                type: "varchar(128)",
                comment: "",
            },
            {
                sequence: 4,
                key: "IDX2,IDX3",
                columnName: "weight",
                type: "double",
                comment: "",
            },
            {
                sequence: 5,
                key: "IDX3",
                columnName: "ripened",
                type: "boolean",
                comment: "",
            },
        ];

        const actualConvertResult = converter.convert(givenRowElements);

        expect(actualConvertResult.isSuccess).toBeTruthy();
        expect(actualConvertResult.primaryKeyColumnName).toEqual("srl");
        expect(actualConvertResult.uniqueKeyIndexAndColumnNamesMap).toEqual({});
        expect(actualConvertResult.indexKeyIndexAndColumnNamesMap).toEqual({
            "1": ["price"],
            "2": ["expression", "weight"],
            "3": ["weight", "ripened"],
        });
    });

    it("expect valid uniqe and index indexes when given unique and index key columns", () => {
        const givenRowElements = [
            {
                sequence: 1,
                key: "PK",
                columnName: "srl",
                type: "bigint",
                comment: "",
            },
            {
                sequence: 2,
                key: "IDX1,UK1",
                columnName: "price",
                type: "integer",
                comment: "",
            },
            {
                sequence: 3,
                key: "IDX2,UK1,UK2",
                columnName: "expression",
                type: "varchar(128)",
                comment: "",
            },
            {
                sequence: 4,
                key: "IDX2,IDX3,UK2",
                columnName: "weight",
                type: "double",
                comment: "",
            },
            {
                sequence: 5,
                key: "IDX3,UK3",
                columnName: "ripened",
                type: "boolean",
                comment: "",
            },
        ];

        const actualConvertResult = converter.convert(givenRowElements);

        expect(actualConvertResult.isSuccess).toBeTruthy();
        expect(actualConvertResult.primaryKeyColumnName).toEqual("srl");
        expect(actualConvertResult.uniqueKeyIndexAndColumnNamesMap).toEqual({
            "1": ["price", "expression"],
            "2": ["expression", "weight"],
            "3": ["ripened"],
        });
        expect(actualConvertResult.indexKeyIndexAndColumnNamesMap).toEqual({
            "1": ["price"],
            "2": ["expression", "weight"],
            "3": ["weight", "ripened"],
        });
    });

    it("expect NotSupportedKeyFailure when given undefined key", () => {
        const givenUndefinedKey = "foo";
        const givenRowElements = [
            {
                sequence: 1,
                key: "PK",
                columnName: "srl",
                type: "bigint",
                comment: "",
            },
            {
                sequence: 2,
                key: givenUndefinedKey,
                columnName: "price",
                type: "integer",
                comment: "",
            },
        ];

        const actualConvertResult = converter.convert(givenRowElements);

        expect(actualConvertResult.isSuccess).toBeFalsy();
        expect(actualConvertResult.failures).toEqual([
            new NotSupportedKeyFailure(givenUndefinedKey),
        ]);
    });

    it("expect NotSupportedTypeFailure when given undefined type", () => {
        const givenUndefinedType = "string";
        const givenRowElements = [
            {
                sequence: 1,
                key: "PK",
                columnName: "srl",
                type: "bigint",
                comment: "",
            },
            {
                sequence: 2,
                key: "",
                columnName: "price",
                type: givenUndefinedType,
                comment: "",
            },
        ];

        const actualConvertResult = converter.convert(givenRowElements);

        expect(actualConvertResult.isSuccess).toBeFalsy();
        expect(actualConvertResult.failures).toEqual([
            new NotSupportedTypeFailure(givenUndefinedType),
        ]);
    });

    it("expect nullable column when given nullable type", () => {
        const givenRowElements = [
            {
                sequence: 1,
                key: "PK",
                columnName: "srl",
                type: "bigint",
                comment: "",
            },
            {
                sequence: 2,
                key: "",
                columnName: "price",
                type: "integer?",
                comment: "",
            },
        ];

        const actualConvertResult = converter.convert(givenRowElements);

        expect(actualConvertResult.isSuccess).toBeTruthy();
        expect(actualConvertResult.failures).toEqual([]);
        expect(actualConvertResult.columns.length).toEqual(givenRowElements.length);
        expect(actualConvertResult.columns[1].isNullable).toBeTruthy();
        expect(actualConvertResult.columns[1].dataType).not.toContain(NULLABLE);
    });
});
