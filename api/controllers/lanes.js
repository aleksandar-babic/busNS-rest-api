/**
 * Created by Aleksandar Babic on 19.11.17..
 * Take a look at my portfolio at https://aleksandar.alfa-ing.com
 */

const utilsScraper = require('../utils/gspnsScraper');

/**
 * GET /lanes route to retrieve all available bus lanes.
 * @param req
 * @param res
 */
function getLanes(req, res) {
    "use strict";
    let dan, rv;


    if (!req.query.dan || !req.query.rv) {
        return res.status(400)
            .json({'message': 'Malformed request, query parameters dan and rv are required.'});
    } else {
        dan = req.query.dan.toUpperCase();
        rv = req.query.rv.toLowerCase();
    }
    if (dan !== 'R' && dan !== 'S' && dan !== 'N') {
        return res.status(400)
            .json({'message': 'Malformed request, allowed values for query parameter dan are \'R\', \'S\', \'N\''});
    } else if (rv !== 'rvg' && rv !== 'rvp') {
        return res.status(400)
            .json({'message': 'Malformed request, allowed values for query parameter rv are \'rvg\', \'rvp\''});
    }

    if (rv === 'rvg') {
        utilsScraper.scrapeLaneCity(dan)
            .then(lanes => res.status(200).json(lanes))
            .catch(err => res.status(500).json(err));
    } else {
        utilsScraper.scrapeLaneNonCity(dan)
            .then(lanes => res.status(200).json(lanes))
            .catch(err => res.status(500).json(err));
    }
}

module.exports = {getLanes};