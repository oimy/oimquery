import { BLANK } from "../../tools/constants";

const NUMBER_TYPE_CONVERSION_MAP: Record<string, string> = {
    int: "Int",
    smallint: "Short",
    bigint: "Long",
    float: "Float",
    double: "double",
};

const STRING_TYPE_CONVERSION_MAP: Record<string, string> = {
    varchar: "String",
    nvarchar: "String",
};

const DATE_TYPE_CONVERSION_MAP: Record<string, string> = {
    datetime: "LocalDateTime",
    date: "LocalDate",
};

const PRIMITIVE_TYPE_CONVERSION_MAP: Record<string, string> = {
    ...NUMBER_TYPE_CONVERSION_MAP,
    ...STRING_TYPE_CONVERSION_MAP,
    ...DATE_TYPE_CONVERSION_MAP,
};

export function convertPrimitiveType(original: string) {
    const matchResults = Object.entries(PRIMITIVE_TYPE_CONVERSION_MAP).filter((pair) => original.startsWith(pair[0]));

    return matchResults.length > 0 ? matchResults[0][1] : BLANK;
}
