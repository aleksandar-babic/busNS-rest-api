/**
 * Created by Aleksandar Babic on 19.11.17..
 * Take a look at my portfolio at https://aleksandar.alfa-ing.com
 */

const osmosis = require('osmosis');

/**
 * Will scrape values that are required to build URL later
 * @returns {Promise}
 */
module.exports.getUrlBaseValues = function() {
    return new Promise((resolve, reject) => {
        let baseUrl = 'http://www.gspns.co.rs/red-voznje/gradski';
        osmosis.get(baseUrl)
            .find('#vaziod')
            .set({
                'vaziod': ['option@value'],
                'vaziodTekst': ['option']
            })
            .find('#rv')
            .set({
                'rv': ['option@value'],
                'rvTekst': ['option']
            })
            .find('#dan')
            .set({
                'dan': ['option@value'],
                'danTekst': ['option']
            })
            .data(data => {
                "use strict";
                data.baseUrl = baseUrl;
                if(!data.rv || !data.dan || !data.vaziod)
                    return reject({'message': 'Failed to get base values from form'});
                resolve(data);
            });
    })
};