export interface Functor<T> {
    map<U>(transfrom: (val: T) => U): Functor<U>;
    fold<U>(onSuccess: (val: T) => U, onFail: (err: Error) => U): U;
}

export interface FunctorWithNull<T> {
    map<U>(transfrom: (val: T | null) => U): FunctorWithNull<U>;
}