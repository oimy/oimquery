export default interface Parser<R> {
    parse(...args: any[]): R;
}
