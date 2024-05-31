import Monad from "./monad";

type Try<T> = Success<T> | Fail;

interface Success<T> extends Monad<T> {
    kind: 'success';
    val: T;
}

interface Fail extends Monad<never> {
    kind: 'fail';
    error: Error;
}

const success = <T>(val: T): Success<T> => {
    return {
        kind: 'success',
        val,
        map<U>(transfrom: (val: T) => U): Success<U> {
            return success(transfrom(this.val));
        },
        fold<U>(onSuccess: (val: T) => U, onFail: (err: Error) => U): U {
            return onSuccess(this.val);
        },
        flatMap<U>(transfrom: (val: T) => Success<U>): Success<U> {
            return transfrom(this.val);
        },
    };
}

const fail = (error: Error): Fail => {
    return {
        kind: 'fail',
        error,
        map<U>(transfrom: (val: never) => U): Fail {
            return this;
        },
        fold<U>(onSuccess: (val: never) => U, onFail: (err: Error) => U): U {
            return onFail(this.error);
        },
        flatMap(transform: (val: never) => Fail): Fail {
            return this;
        }
    }
}

export function sum(a: number, b: number): Try<number> {
    try {
        return success(a + b);
    } catch (error) {
        return fail(new Error('error occurred'));
    }
}

export function stringToInt(s: string): Try<number> {
    const result = parseInt(s, 10);
    if (isNaN(result)) return fail(new Error('error occurred when parse s to int'));
    return success(result);
}

export function stringArrToIntArr(s: string[]): Try<number>[] {
    const resultList: Try<number>[] = [];
    for (let i = 0; i < s.length; i++) {
        const result = parseInt(s[i], 10);
        if (!isNaN(result)) {
            resultList.push(success(result));
        } else {
            resultList.push(fail(new Error('error occurred when parse s to int')));
        }
    }
    return resultList;
}

export const stringToIntMap = (s: string) => {
    return stringToInt(s).map(
        (val) => val + 1
    );
}

export const stringToIntFold = (s: string) => {
    return stringToInt(s).fold(
        (val: number) => console.log(`Success: result is ${val}`),
        (err: Error) => console.log(`Fail: ${err.message}`)
    );
}

export const sumWithFold = (a: number) => (b: number) => {
    return sum(a, b).fold(
        (val: number) => console.log(`Success: result is ${val}`),
        (err: Error) => console.log(`Fail: ${err.message}`)
    );
}

stringToInt('日').map((val) => val + 1).fold(
    (val: number) => console.log(`Success: result is ${val}`),
    (err: Error) => console.log(`Fail: ${err.message}`)
);

stringToInt('123').flatMap((val) => success(val + 1)).fold(
    (val: number) => console.log(`Success: result is ${val}`),
    (err: Error) => console.log(`Fail: ${err.message}`)
);

stringArrToIntArr(['123', '日', '4321'])
    .forEach((val) => {
        val.fold(
            (val: number) => console.log(`Success: result is ${val}`),
            (err: Error) => console.log(`Fail: ${err.message}`)
        )
    })
    