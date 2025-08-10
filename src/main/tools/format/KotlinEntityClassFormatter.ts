import { camelize } from "../../utils/case";
import { convertPrimitiveType } from "../../utils/kotlin/type";
import { BLANK, INDENT } from "../constants";
import { Table } from "../drawio/models/table";

const DEFAULT_IMPORT_LINES = ["jakarta.persistence.*"];
const COMPANION_OBJECT_TEXT = "companion object";

export interface KotlinEntityClassOption {
    pluralRemovalCount: number;
    ignoreNames: string[];
    inheritanceClass?: KotlinEntityInheritanceClass;
}

export interface KotlinEntityInheritanceClass {
    name: string;
    properties: KotlinClassProperty[];
}

export interface KotlinClassProperty {
    name: string;
    dataType: string;
}

export default class KotlinEntityClassFormatter {
    format(table: Table, option: KotlinEntityClassOption): string {
        const importLines = DEFAULT_IMPORT_LINES;
        const classAnnotationLines = ["Entity"];
        classAnnotationLines.push(`Table(name = "${table.name}")`);
        let className = camelize(table.name);
        if (option.pluralRemovalCount > 0) {
            className = className.substring(0, className.length - option.pluralRemovalCount);
        }
        const classDefinition = `class ${className} private constructor(`;

        const contentLines: string[] = [];
        importLines.forEach((line) => contentLines.push("import " + line));
        contentLines.push(BLANK);
        classAnnotationLines.forEach((line) => contentLines.push("@" + line));
        contentLines.push(classDefinition);

        const hiddenTableColumns = table.columns
            .filter((column) => !option.ignoreNames.includes(column.name))
            .filter(
                (column) =>
                    !Object.values(table.columnKeyOption.foreignKeyIndexAndColumnNameMap).flat().includes(column.name)
            );
        hiddenTableColumns.forEach((column) => {
            const line = `${INDENT}var ${column.name}: ${convertPrimitiveType(column.dataType)},\n`;
            contentLines.push(line);
        });
        if (option.inheritanceClass) {
            option.inheritanceClass.properties.forEach((property) => {
                const line = `${INDENT}${property.name}: ${convertPrimitiveType(property.dataType)}`;
                contentLines.push(line);
            });
            contentLines.push(") :");

            const inheritancePropertyAssign = option.inheritanceClass.properties
                .map((property) => `${property.name} = ${property.name}`)
                .join(", ");
            contentLines.push(`${INDENT}${option.inheritanceClass.name}(${inheritancePropertyAssign}) {`);
        } else {
            contentLines.push(") {");
        }

        contentLines.push(BLANK);
        contentLines.push(INDENT + COMPANION_OBJECT_TEXT + " {");
        let staticFactoryConstructorParameter: string = hiddenTableColumns
            .map((column) => `${column.name}: ${convertPrimitiveType(column.dataType)}`)
            .join(", ");
        let staticFactoryConstructorArgument: string = hiddenTableColumns
            .map((column) => `${column.name} = ${column.name}`)
            .join(", ");
        if (option.inheritanceClass) {
            staticFactoryConstructorParameter +=
                ", " +
                option.inheritanceClass.properties
                    .map((property) => `${property.name}: ${convertPrimitiveType(property.dataType)},`)
                    .join(", ");
            staticFactoryConstructorArgument +=
                ", " +
                option.inheritanceClass.properties.map((property) => `${property.name} = ${property.name}`).join(", ");
        }
        contentLines.push(INDENT.repeat(2) + "fun of(" + staticFactoryConstructorParameter + ") =");
        contentLines.push(INDENT.repeat(3) + className + "(" + staticFactoryConstructorArgument + ")");
        contentLines.push(INDENT + " }");

        contentLines.push("\n}");

        return contentLines.join("\n");
    }
}
