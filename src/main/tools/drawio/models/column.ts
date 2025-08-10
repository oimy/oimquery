export interface Column {
    name: string;
    dataType: string;
    isNullable: boolean;
    comment: string;
    sequence: number;
}

export interface ColumnKeyOption {
    primaryKeyColumnName: string;
    uniqueKeyIndexAndColumnNamesMap: Record<number, string[]>;
    indexKeyIndexAndColumnNameMap: Record<number, string[]>;
    foreignKeyIndexAndColumnNameMap: Record<number, string[]>;
}
