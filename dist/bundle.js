/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/fp/try.ts":
/*!***********************!*\
  !*** ./src/fp/try.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sumWithFold = exports.stringToIntFold = exports.stringToIntMap = exports.stringArrToIntArr = exports.stringToInt = exports.sum = void 0;
const success = (val) => {
    return {
        kind: 'success',
        val,
        map(transfrom) {
            return success(transfrom(this.val));
        },
        fold(onSuccess, onFail) {
            return onSuccess(this.val);
        },
        flatMap(transfrom) {
            return transfrom(this.val);
        },
    };
};
const fail = (error) => {
    return {
        kind: 'fail',
        error,
        map(transfrom) {
            return this;
        },
        fold(onSuccess, onFail) {
            return onFail(this.error);
        },
        flatMap(transform) {
            return this;
        }
    };
};
function sum(a, b) {
    try {
        return success(a + b);
    }
    catch (error) {
        return fail(new Error('error occurred'));
    }
}
exports.sum = sum;
function stringToInt(s) {
    const result = parseInt(s, 10);
    if (isNaN(result))
        return fail(new Error('error occurred when parse s to int'));
    return success(result);
}
exports.stringToInt = stringToInt;
function stringArrToIntArr(s) {
    const resultList = [];
    for (let i = 0; i < s.length; i++) {
        const result = parseInt(s[i], 10);
        if (!isNaN(result)) {
            resultList.push(success(result));
        }
        else {
            resultList.push(fail(new Error('error occurred when parse s to int')));
        }
    }
    return resultList;
}
exports.stringArrToIntArr = stringArrToIntArr;
const stringToIntMap = (s) => {
    return stringToInt(s).map((val) => val + 1);
};
exports.stringToIntMap = stringToIntMap;
const stringToIntFold = (s) => {
    return stringToInt(s).fold((val) => console.log(`Success: result is ${val}`), (err) => console.log(`Fail: ${err.message}`));
};
exports.stringToIntFold = stringToIntFold;
const sumWithFold = (a) => (b) => {
    return sum(a, b).fold((val) => console.log(`Success: result is ${val}`), (err) => console.log(`Fail: ${err.message}`));
};
exports.sumWithFold = sumWithFold;
stringToInt('日').map((val) => val + 1).fold((val) => console.log(`Success: result is ${val}`), (err) => console.log(`Fail: ${err.message}`));
stringToInt('123').flatMap((val) => success(val + 1)).fold((val) => console.log(`Success: result is ${val}`), (err) => console.log(`Fail: ${err.message}`));
stringArrToIntArr(['123', '日', '4321'])
    .forEach((val) => {
    val.fold((val) => console.log(`Success: result is ${val}`), (err) => console.log(`Fail: ${err.message}`));
});


/***/ }),

/***/ "./src/linkedList/linkedList.ts":
/*!**************************************!*\
  !*** ./src/linkedList/linkedList.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.printList = exports.linkedListOf = exports.cons = exports.nil = void 0;
// constructor
exports.nil = {
    kind: 'Nil',
    map(transfrom) {
        return this;
    }
};
const cons = (head, tail) => {
    return {
        kind: 'Cons',
        head: head,
        tail: tail,
        map(transfrom) {
            return (0, exports.cons)(transfrom(this.head), this.tail.map(transfrom));
        }
    };
};
exports.cons = cons;
function getCons(list) {
    if (list.kind === 'Cons') {
        return 'Cons';
    }
    else if (list.kind === 'Nil') {
        return 'Nil';
    }
    else {
        const exhaustiveCheck = list;
        return exhaustiveCheck;
    }
}
// Array<T>
// reduce = <U> (callbackFn: (acc: U, curr: T), initialValue: U)
const linkedListOf = (...args) => {
    return args
        .reduceRight(// = reverse.reduce
    (tail, head) => (0, exports.cons)(head, tail), exports.nil);
};
exports.linkedListOf = linkedListOf;
const printList = (list, elementList = []) => {
    // base case
    if (list.kind === 'Nil') {
        const printStatement = elementList.join(' -> ').concat(' -> null');
        console.log(printStatement);
        return;
    }
    const cons = list;
    elementList.push(cons.head);
    (0, exports.printList)(cons.tail, elementList);
};
exports.printList = printList;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const linkedList_1 = __webpack_require__(/*! ./linkedList/linkedList */ "./src/linkedList/linkedList.ts");
const try_1 = __webpack_require__(/*! ./fp/try */ "./src/fp/try.ts");
document.addEventListener("DOMContentLoaded", () => {
    const testText = document.querySelector("h1");
    if (testText != null) {
        testText.innerText = "Hello World";
    }
});
const list = (0, linkedList_1.linkedListOf)(1, 2, 3, 4);
const mappedList = list.map(x => x != null ? x * 2 : x);
(0, linkedList_1.printList)(mappedList);
console.log((0, try_1.sum)(1, 2).map((val) => val + 2));
function getNestedJsonProperty(nestedObj, name) {
    const level = name.split('.');
    function helper(currLevel, currObj) {
        if (currObj === undefined)
            throw Error('undefined');
        if (currLevel > (level.length - 1))
            return currObj;
        if (typeof currObj === 'string')
            throw Error('Invalid path: Reached a string before completing the path');
        const nextLevel = currObj[level[currLevel]];
        return helper(currLevel + 1, nextLevel);
    }
    return helper(0, nestedObj);
}
function getNestedJsonProperty1(nestedObj, name) {
    let level = name.split(".");
    const helper = (obj, currLevel) => {
        let curr = level[currLevel];
        if (curr === undefined)
            throw Error('undefined');
        if (currLevel === level.length - 1)
            return obj[curr];
        return helper(obj[curr], currLevel + 1);
    };
    return helper(nestedObj, 0);
}
const mockObj = {
    user: {
        name: {
            last: "chris"
        }
    }
};
console.log('user: ' + getNestedJsonProperty(mockObj, 'user'));
console.log('user.name: ' + getNestedJsonProperty(mockObj, 'user.name'));
console.log('user.name.last: ' + getNestedJsonProperty(mockObj, 'user.name.last'));

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map