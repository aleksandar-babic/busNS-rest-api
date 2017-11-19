/**
 * Created by Aleksandar Babic on 19.11.17..
 * Take a look at my portfolio at https://aleksandar.alfa-ing.com
 */

const mongoose = require('mongoose');
const Bus = require('../model/bus');

/*
 * GET /buses route to retrieve all the buses.
 */
function getBuses(req, res) {
    const query = Bus.find({})
        .then(buses => res.status(200).send(buses))
        .catch(err => res.status(500).send(err));
}

/*
 * GET /buses/:id route to retrieve a bus schedule given its id.
 */
function getBus(req, res) {
   Bus.findOne({id: req.params.id})
       .then(bus => res.status(200).send(bus))
       .catch(err => res.status(500).send(err));
}

/*
 * POST /buses to test Bus scheme.
 */
function testBus(req, res) {
    const rasporedA = {
        "07": [
            "21",
            "33",
            "46",
            "56"
        ],
        "08": [
            "28",
            "39",
            "49",
            "59"
        ]
    };

    const rasporedB = {
        "09": [
            "21",
            "33",
            "46",
            "56"
        ],
        "10": [
            "28",
            "39",
            "49",
            "59"
        ]
    };

    const bus = new Bus();
    bus.id = '9';
    bus.linija = 'NOVO NASELJE - CENTAR - LIMAN I';
    bus.dan = 'R';
    bus.dodaci = 'Niskopodni';
    bus.rasporedA = rasporedA;
    bus.rasporedB = rasporedB;
    bus.save()
        .then(() => res.status(200).send(bus))
        .catch(err => res.status(500).send(err));
}

module.exports = { getBuses, getBus, testBus };