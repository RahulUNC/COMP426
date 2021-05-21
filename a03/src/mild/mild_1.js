/**
 *
 * @param {number} a
 * @param {number} b
 * @returns {string} 'a + b = (a + b)'
 *
 * example: sumToString(3, 4)
 * returns: '3 + 4 = 7'
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
 */
export function sumToString(a, b) {
    let sum = a + b;
    return a + ' + ' + b + ' = ' + sum;
}


/**
 *
 * @param {number} startNumber
 * @param {number} endNumber
 * @returns {number[]}
 *
 * example: getIncreasingArray(3, 7)
 * returns: [ 3, 4, 5, 6, 7 ]
 *
 */
export function getIncreasingArray(startNumber, endNumber) {
    var returnArr = [];
    for(let i =  startNumber; i <= endNumber; i++) {
        returnArr.push(i);
    }
    return returnArr;
}

/**
 *
 * @param {number[]} numbers
 * @return {{min: number, max: number}}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
 * and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
 */
export function maxAndMin(numbers) {
    return {"min":Math.min(...numbers), "max":Math.max(...numbers)};
}

/**
 *
 * @param array - An array of any primitive type
 * @returns {object} Object where the keys are the values that were passed in
 * and the value was the number of times it occurred.
 *
 * example: countArray([3, 6, 3, 2, 2, 3, 'some', 'hello', 'some', [1, 2]])
 * returns: {'2': 2, '3': 3, '6': 1, some: 2, hello: 1, '1,2': 1}
 *
 */
export function countArray(array) {
    let returnJson = {};
    for(let i = 0; i < array.length; i++) {
        if(!returnJson[array[i]]) {
            returnJson[array[i]] = 1;
        } else {
            returnJson[array[i]]++;
        }
    }
    return returnJson;
}

function count(array, val) {
    return array.reduce((numCount, i) => {
        if(i === val) {
            numCount++
        } else { }
        return numCount;
    }, 0);
}

console.log(sumToString(4, 7));
console.log(getIncreasingArray(1,5));
console.log(maxAndMin([5,6,1,3,9]));
console.log(countArray([1,2,3],[1,2,3],34,43,34,43));