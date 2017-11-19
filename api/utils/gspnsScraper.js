/**
 * Created by Aleksandar Babic on 19.11.17..
 * Take a look at my portfolio at https://aleksandar.alfa-ing.com
 */
const osmosis = require('osmosis');
const buildUrl = require('build-url');
const utilsBuildUrl = require('./gspnsBuildUrl');

/**
 * Will take day as parameter ('R','S','N' ), it will fallback to 'R' if no parameter is passed
 * Will get all bus lines for city buses on given day
 * @param day
 * @returns {Promise}
 */
module.exports.scrapeLineCity = function (day) {
    return new Promise(async (resolve, reject) => {
        day = day.toUpperCase();
        const queryData = await utilsBuildUrl.getUrlBaseValues();
        const baseUrl = 'http://www.gspns.co.rs/red-voznje/lista-linija';
        const URL = buildUrl(baseUrl, {
            queryParams: {
                rv: 'rvg',
                vaziod: queryData.vaziod[queryData.vaziod.length - 1],
                dan: queryData.dan.includes(day) ? day : 'R'
            }
        });
        osmosis.get(URL)
            .find('#linija')
            .set({'linije': ['option@value']})
            .set({'linijeTekst': ['option']})
            .data(async data => {
                "use strict";
                const mappedArray = await data.linije.map((curr,index) => {
                    const newCurr = {};
                    newCurr[curr] = data.linijeTekst[index];
                    return newCurr;
                });
                if(mappedArray.length == 0)
                    return reject({'message': 'Error while getting lanes, got no results'});
                resolve(mappedArray);
            });
    });
};

/**
 *  Will take day as parameter ('R','S','N' ), it will fallback to 'R' if no parameter is passed
 *  Will get all bus lines for non city buses on given day
 * @param day
 * @returns {Promise}
 */
module.exports.scrapeLineNonCity = function (day) {
    return new Promise(async (resolve, reject) => {
        day = day.toUpperCase();
        const queryData = await utilsBuildUrl.getUrlBaseValues();
        const baseUrl = 'http://www.gspns.co.rs/red-voznje/lista-linija';
        const URL = buildUrl(baseUrl, {
            queryParams: {
                rv: 'rvp',
                vaziod: queryData.vaziod[queryData.vaziod.length - 1],
                dan: queryData.dan.includes(day) ? day : 'R'
            }
        });
        osmosis.get(URL)
            .find('#linija')
            .set({'linije': ['option@value']})
            .set({'linijeTekst': ['option']})
            .data(async data => {
                "use strict";
                const mappedArray = await data.linije.map((curr, index) => {
                    const newCurr = {};
                    newCurr[curr] = data.linijeTekst[index];
                    return newCurr;
                });
                if(mappedArray.length == 0)
                    return reject({'message': 'Error while getting lanes, got no results'});
                resolve(mappedArray);
            });
    });
};
