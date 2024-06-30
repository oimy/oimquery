import Converter from "../Converter";
import { TemplateConvertResult } from "./models";

export default interface TemplateConverter extends Converter<string[], TemplateConvertResult> {
    convert(cellValues: string[]): TemplateConvertResult;
}
