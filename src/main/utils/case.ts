import { BLANK } from "../tools/constants";

export function camelize(text: string): string {
    return text
        .split("_")
        .map((word) => word.substring(0, 1).toUpperCase() + word.substring(1, word.length).toLowerCase())
        .join(BLANK);
}
