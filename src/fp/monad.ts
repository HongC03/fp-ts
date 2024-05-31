import { Functor } from "./functor";

export default interface Monad<T> extends Functor<T> {
    flatMap<U>(transfrom: (val: T) => Monad<U>): Monad<U>;
}