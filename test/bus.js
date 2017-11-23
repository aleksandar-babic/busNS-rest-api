/**
 * Created by Aleksandar Babic on 19.11.17..
 * Take a look at my portfolio at https://aleksandar.alfa-ing.com
 */

process.env.NODE_ENV = 'test';
const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const Bus = require('../api/model/bus');

chai.use(chaiHttp);

/**
 * Holds all tests related to Buses endpoint(s)
 */
describe('Buses', () => {
    "use strict";
    /*beforeEach((done) => {
        Bus.remove({})
            .then(() => done());
    });

    describe('/GET Buses', () => {
        "use strict";
        it('it should GET all the bus schedules', (done) => {
            chai.request(server)
                .get('/buses')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    //res.body.length.should.be.at.least(1);
                    done();
                });
        });
    });*/



});
