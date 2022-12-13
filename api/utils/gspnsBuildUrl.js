/**
 * Created by Aleksandar Babic on 19.11.17..
 * Take a look at my portfolio at https://aleksandar.alfa-ing.com
 */

const osmosis = require('osmosis');
const axios = require('axios');
const cheerio = require('cheerio');
/**
 * Will scrape values that are required to build URL later
 * @returns {Promise}
 */
module.exports.getUrlBaseValues = function() {
    return new Promise((resolve, reject) => {
        let baseUrl = 'http://www.gspns.co.rs/red-voznje/gradski';
        axios.get(baseUrl)
        .then((response) =>{

            const $ = cheerio.load(response.data);

            const vaziod = $('#vaziod').find(":selected").val().trim()
            let rv = [];
            let dan = [];
            $("#rv").find('option').each((i,op) => {
                rv.push($(op).val())
            })
            $('#dan').find('option').each((i,op) => {
                dan.push($(op).val())
            })

            resolve({vaziod, rv, dan});
        })
        .catch((err) =>{
            console.log("err ", err);
            return reject({'message': 'Failed to get base values from form'});
        });
    })
};