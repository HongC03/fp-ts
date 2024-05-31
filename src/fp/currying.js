function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }
        return function(...nextArgs) {
            return curried.apply(this, args.concat(nextArgs));
        }
    }
}

// Add

function add(a, b) {
    return a + b;
}

const curriedAdd = curry(add);
console.log("curry helper function add result: " + curriedAdd(1)(2));

const add1 = (a) => (b) => {
    return a + b;
}

console.log("curry arrow function add result: " + add1(1)(2));

// Divide

function divide(a, b) {
    return a / b;
}

const curriedDivide = curry(divide);
console.log("curry helper function divide result: " + curriedDivide(6)(2));

const divide2 = (a) => (b) => {
    return a / b;
}

console.log("curry arrow function divide result: " + divide2(6)(2));