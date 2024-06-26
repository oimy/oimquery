const numberDataTypes: string[] = ["bigint", "integer", "smallint", "double"];
const stringDataTypes: string[] = ["varchar", "nvarchar", "text"];
const booleanDataTypes: string[] = ["boolean", "tinyint"];
const jsonDataTypes: string[] = ["json"];
const dateDataTypes: string[] = ["date", "datetime"];

export const dataTypes: string[] = [
    numberDataTypes,
    stringDataTypes,
    booleanDataTypes,
    jsonDataTypes,
    dateDataTypes,
].flat();
