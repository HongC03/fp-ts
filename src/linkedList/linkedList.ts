import { FunctorWithNull } from "../fp/functor";

export type LinkedList<T> = Cons<T> | Nil;

interface Cons<T> extends FunctorWithNull<T> {
    readonly kind: 'Cons';
    readonly head: T | null;
    readonly tail: LinkedList<T>;
    map<U>(transform: (val: T | null) => U): LinkedList<U>;
}

interface Nil extends FunctorWithNull<never> {
    readonly kind: 'Nil';
    map<U>(transform: (val: never) => U): LinkedList<U>;
}

// constructor
export const nil: Nil = { 
    kind: 'Nil',
    map<U>(transfrom: (val: never) => U): LinkedList<U> {
        return this;
    } 
};

export const cons = <T>(head: T | null, tail: LinkedList<T>): LinkedList<T> => {
    return { 
        kind: 'Cons', 
        head: head, 
        tail: tail,
        map<U>(transfrom: (val: T | null) => U): LinkedList<U> {
            return cons(transfrom(this.head), this.tail.map(transfrom) as LinkedList<U>);
        }
    };
}

function getCons<T>(list: LinkedList<T>): string {
    if (list.kind === 'Cons') {
        return 'Cons';
    } else if (list.kind === 'Nil') {
        return 'Nil';
    } else {
        const exhaustiveCheck: never = list;
        return exhaustiveCheck;
    }
}

// Array<T>
// reduce = <U> (callbackFn: (acc: U, curr: T), initialValue: U)
export const linkedListOf = <T> (...args: (T | null)[]) : LinkedList<T> => {
    return args
            .reduceRight( // = reverse.reduce
                (tail, head) => cons(head, tail),
                nil as LinkedList<T>
            )
}

export const printList = <T> (list: LinkedList<T>, elementList: (T | null)[] = []) : void => {
    // base case
    if (list.kind === 'Nil') {
        const printStatement = elementList.join(' -> ').concat(' -> null');
        console.log(printStatement);
        return;
    }
    const cons = list as Cons<T>;
    elementList.push(cons.head);
    printList(cons.tail, elementList);
}