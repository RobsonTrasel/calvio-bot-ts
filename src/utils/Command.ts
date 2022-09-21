export default abstract class Command<T> {
    abstract execute(messate: T): Promise<any>
}