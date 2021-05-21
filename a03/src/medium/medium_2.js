import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
    avgMpg: avgMpg(mpg_data),
    allYearStats: allYearStats(mpg_data),
    ratioHybrids: ratioHybrids(mpg_data),
};

function allYearStats(mpg_data) {
    let yearRange = [];
    for(let i = 0; i < mpg_data.length; i++) {
        yearRange.push(mpg_data[i]["year"]);
    }
    return getStatistics(yearRange);
}

function ratioHybrids(mpg_data) {
    let numHybrid = 0;
    for (let i = 0; i < mpg_data.length; i++) {
        if(mpg_data[i]["hybrid"]) {
            numHybrid++;
        }
    }
    return numHybrid/mpg_data.length;
}

function avgMpg(mpg_data) {
    let sumCity = 0;
    let sumHighway = 0;
    for(let i =  0; i < mpg_data.length; i++) {
        sumCity += mpg_data[i]["city_mpg"];
        sumHighway += mpg_data[i]["highway_mpg"];
    }
    return {
        "city":sumCity/mpg_data.length,
        "highway":sumHighway/mpg_data.length
    };
}

/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
export const moreStats = {
    makerHybrids: findHybrids(mpg_data),
    avgMpgByYearAndHybrid: avgMpgByYear(mpg_data)
};
function findHybrids(mpg_data) {
    let hybridSet = [...new Set(mpg_data.filter(c => c.hybrid).map(c => c.make))].map(make => {
        let reutrnJson = {
            make: make,
            hybrids: mpg_data.filter(c => c.make === make && c.hybrid).map(c => c.id)
        }
        return reutrnJson;
    }).sort((i, j) => j.hybrids.length - i.hybrids.length)
    return hybridSet;
}
function avgMpgByYear(mpg_data) {
    let yearSet = [... new Set(mpg_data.map(c => c.year))].reduce((c, year) => {
        return {...c, [year]: {
            hybrid: avgMpg(mpg_data.filter(c => c.hybrid && c.year === year)),
            notHybrid: avgMpg(mpg_data.filter(c => !c.hybrid && c.year === year)),
        }}
    }, {})
    return yearSet;
}

console.log(allCarStats.avgMpg);
console.log(allCarStats.allYearStats);
console.log(allCarStats.ratioHybrids);
console.log(moreStats.makerHybrids);
console.log(moreStats.avgMpgByYearAndHybrid)