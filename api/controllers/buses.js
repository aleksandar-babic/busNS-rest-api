/**
 * Created by Aleksandar Babic on 19.11.17..
 * Take a look at my portfolio at https://aleksandar.alfa-ing.com
 */

const Bus = require('../model/bus');

const utilsScraper = require('../utils/gspnsScraper');

/**
 * GET /buses route to retrieve all the buses.
 * @param req
 * @param res
 */
function getBuses(req, res) {
    let rv, linija;
    let cela_nedelja = [];
    let async_call = 0;

    if(!req.query.rv || !req.params.id) {
        return res.status(400)
            .json({"message": "Malformed request, query paramater rv is required"})
    } else {
        dani = ['R', 'S', 'N']
        rv = req.query.rv.toLowerCase();
        linija = req.params.id.toUpperCase();
    }

    if (rv !== 'rvg' && rv !== 'rvp') {
        return res.status(400)
            .json({'message': 'Malformed request, allowed values for query parameter rv are \'rvg\', \'rvp\''});
    }

    for (dan of dani) {
        utilsScraper.scrapeBus(linija, dan, rv)
        .then(data => {
            async_call += 1;
            cela_nedelja.push(data)
            if(async_call === 3) {
                res.status(200).json(cela_nedelja)
            }
        })
        .catch(err => {
            async_call += 1;
            if(async_call === 3 && cela_nedelja.length === 0) {
                res.status(500).json(err)
            } else if (async_call === 3) {
                res.status(200).json(cela_nedelja)
            }
        });

    }
}

/**
 * GET /buses/:id route to retrieve a bus schedule given its id.
 * @param req
 * @param res
 */
function getBus(req, res) {
    let dan, rv, linija;

    if (!req.query.dan || !req.query.rv || !req.params.id) {
        return res.status(400)
            .json({'message': 'Malformed request, query parameters dan and rv are required.'});
    } else {
        dan = req.query.dan.toUpperCase();
        rv = req.query.rv.toLowerCase();
        linija = req.params.id.toUpperCase();
    }
    if (dan !== 'R' && dan !== 'S' && dan !== 'N') {
        return res.status(400)
            .json({'message': 'Malformed request, allowed values for query parameter dan are \'R\', \'S\', \'N\''});
    } else if (rv !== 'rvg' && rv !== 'rvp') {
        return res.status(400)
            .json({'message': 'Malformed request, allowed values for query parameter rv are \'rvg\', \'rvp\''});
    }
    utilsScraper.scrapeBus(linija, dan, rv)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
}

module.exports = {getBuses, getBus};