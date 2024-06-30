export default interface Converter<S, D> {
    convert(source: S): D;
}
