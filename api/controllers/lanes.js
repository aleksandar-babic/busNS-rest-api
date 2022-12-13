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
function getAllLanes(req, res) {
    "use strict";
    let rv;
    let async_call = 0;
    let sve_linije = [];
    var dan;
    if (!req.query.rv) {
        return res.status(400)
            .json({'message': 'Malformed request, query parameters dan and rv are required.'});
    } else {
        var dani = ['R', 'S', 'N'];
        rv = req.query.rv.toLowerCase();
    }

    if (rv !== 'rvg' && rv !== 'rvp') {
        return res.status(400)
            .json({'message': 'Malformed request, allowed values for query parameter rv are \'rvg\', \'rvp\''});
    }
    
    for(dan of dani){
        if (rv === 'rvg') {
            utilsScraper.scrapeLaneCity(dan)
            .then(lanes => {
                async_call += 1;
                sve_linije = sve_linije.concat(lanes);
                if(async_call === dani.length) {
                    res.status(200).json(arrayUnique(sve_linije).sort(function(a, b){
                        var x = a.id.toLowerCase();
                        var y = b.id.toLowerCase();
                        x = x.replace(/[^0-9]/g, '');
                        y = y.replace(/[^0-9]/g, '');
                        var numX = parseInt(x);
                        var numY = parseInt(y);
                        return numX - numY;
                    }))
                }
            })
            .catch(err => res.status(500).json(err));
        } else {
            utilsScraper.scrapeLaneNonCity(dan)
                .then(lanes => {
                    async_call += 1;
                    sve_linije = sve_linije.concat(lanes);
                    if(async_call === dani.length) {
                        res.status(200).json(arrayUnique(sve_linije).sort(function(a, b){
                            var x = a.id.toLowerCase();
                            var y = b.id.toLowerCase();
                            x = x.replace(/[^0-9]/g, '');
                            y = y.replace(/[^0-9]/g, '');
                            var numX = parseInt(x);
                            var numY = parseInt(y);
                            return numX - numY;
                        }))
                    }
                })
                .catch(err => res.status(500).json(err));
        }
    }
}

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

    console.log('before scrapeLaneCity')
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

module.exports = {getAllLanes, getLanes};

function arrayUnique(array) {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i].id === a[j].id)
                a.splice(j--, 1);
        }
    }

    return a;
}