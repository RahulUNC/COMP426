import {variance} from "./data/stats_helpers.js";

/**
 * Gets the sum of an array of numbers.
 * @param array
 * @returns {*}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * prototype functions. Very useful
 */
export function getSum(array) {
    return array.reduce((count, i) => count + i, 0);
}


/**
 * Calculates the median of an array of numbers.
 * @param {number[]} array
 * @returns {number|*}
 *
 * example:
 * let array = [3,2,5,6,2,7,4,2,7,5];
 * console.log(getMedian(array)); // 4.5
 */
export function getMedian(array) {
    var mid = Math.floor(array.length / 2);
    if (array.length % 2) {        
        return array[mid];  
    } else {
        return (array[mid - 1] + array[mid]) / 2.0;
    }
}

/**
 * Calculates statistics (see below) on an array of numbers.
 * Look at the stats_helper.js file. It does variance which is used to calculate std deviation.
 * @param {number[]} array
 * @returns {{min: *, median: *, max: *, variance: *, mean: *, length: *, sum: *, standard_deviation: *}}
 *
 * example:
 * getStatistics([3,2,4,5,5,5,2,6,7])
 * {
  length: 9,
  sum: 39,
  mean: 4.333333333333333,
  median: 5,
  min: 2,
  max: 7,
  variance: 2.6666666666666665,
  standard_deviation: 1.632993161855452
 }
 */
export function getStatistics(array) {
    let returnObject = {};
    returnObject["length"] = array.length;
    returnObject["sum"] = getSum(array);
    returnObject["mean"] = returnObject["sum"]/returnObject["length"];
    returnObject["median"] = getMedian(array);
    returnObject["min"] = Math.min(...array);
    returnObject["max"] = Math.max(...array);
    returnObject["variance"] = variance(array, returnObject["mean"]);
    returnObject["standard_deviation"] = Math.pow(returnObject["variance"],0.5);
    return returnObject;
}
console.log(getSum([1,2,3,4,5]));
console.log(getMedian([3,2,5,6,2,7,4,2,7,5]));
console.log(getStatistics([3,2,4,5,5,5,2,6,7]));