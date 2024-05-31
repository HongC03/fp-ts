import { LinkedList, linkedListOf, printList } from "./linkedList/linkedList";
import { sum } from "./fp/try";

document.addEventListener("DOMContentLoaded", () => {
    const testText: HTMLHeadingElement | null = document.querySelector("h1");
    
    if (testText != null) {
        testText.innerText = "Hello World";
    }
})

const list: LinkedList<number> = linkedListOf(1, 2, 3, 4);

const mappedList = list.map(x => x != null ? x * 2 : x);

printList(mappedList);

console.log(sum(1, 2).map((val) => val + 2));

type NestedObject = {
    [key: string]: string | NestedObject;
}

function getNestedJsonProperty(nestedObj: NestedObject, name: string): NestedObject | string {
    const level: string[] = name.split('.');

    function helper(currLevel: number, currObj: NestedObject | string): NestedObject | string {
        if (currObj === undefined) throw Error('undefined');
        if (currLevel > (level.length - 1)) return currObj;
        if (typeof currObj === 'string') throw Error('Invalid path: Reached a string before completing the path');
        const nextLevel = currObj[level[currLevel]];
        return helper(currLevel + 1, nextLevel);
    }

    return helper(0, nestedObj);
}

function getNestedJsonProperty1(nestedObj: object, name: string): any {
   let level: string[] = name.split(".");
    
    const helper = (obj: Record<string,any>, currLevel: number): string=>{
        let curr = level[currLevel];
        if (curr === undefined) throw Error('undefined');
        if (currLevel === level.length - 1) return obj[curr];
        return helper(obj[curr], currLevel + 1);
   }

    return helper(nestedObj, 0);
}

const mockObj: NestedObject = {
    user: {
        name: {
            last: "chris"
        }
    }
}

console.log('user: ' + getNestedJsonProperty(mockObj, 'user'));
console.log('user.name: ' + getNestedJsonProperty(mockObj, 'user.name'));
console.log('user.name.last: ' + getNestedJsonProperty(mockObj, 'user.name.last'));
