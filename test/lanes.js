/**
 * Created by Aleksandar Babic on 20.11.17..
 * Take a look at my portfolio at https://aleksandar.alfa-ing.com
 */

process.env.NODE_ENV = 'test';
const mongoose = require('mongoose');
const chai = require('chai');
const server = require('../server');
const should = chai.should();
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const utilsScraper = require('../api/utils/gspnsScraper');
const utilsBuildUrl = require('../api/utils/gspnsBuildUrl');

/**
 * Holds all tests related to Lanes endpoint
 */
describe('/GET Lanes', () => {
    "use strict";
    it('it should GET all lanes for city buses on work days', (done) => {
        chai.request(server)
            .get(`/lanes?dan=R&rv=rvg`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array').that.has.lengthOf.at.least(15);
                done();
            });

    });

    it('it should GET all lanes for city buses on saturday', (done) => {
        chai.request(server)
            .get(`/lanes?dan=S&rv=rvg`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array').that.has.lengthOf.at.least(15);
                done();
            });
    });

    it('it should GET all lanes for city buses on sunday', (done) => {
        chai.request(server)
            .get(`/lanes?dan=N&rv=rvg`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array').that.has.lengthOf.at.least(15);
                done();
            });
    });

    it('it should GET all lanes for non city buses on work days', (done) => {
        chai.request(server)
            .get(`/lanes?dan=R&rv=rvp`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array').that.has.lengthOf.at.least(25);
                done();
            });
    });

    it('it should GET all lanes for non city buses on saturday', (done) => {
        chai.request(server)
            .get(`/lanes?dan=S&rv=rvp`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array').that.has.lengthOf.at.least(25);
                done();
            });
    });

    it('it should GET all lanes for non city buses on sunday', (done) => {
        chai.request(server)
            .get(`/lanes?dan=N&rv=rvp`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array').that.has.lengthOf.at.least(25);
                done();
            });
    });

    it('it should GET all lanes for city buses on work days lower case dan', (done) => {
        chai.request(server)
            .get(`/lanes?dan=r&rv=rvg`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array').that.has.lengthOf.at.least(15);
                done();
            });
    });

    it('it should GET all lanes for non city buses on work days lower case dan', (done) => {
        chai.request(server)
            .get(`/lanes?dan=r&rv=rvp`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array').that.has.lengthOf.at.least(15);
                done();
            });
    });

    it('it should throw an error code when sending invalid query parameters - dan', (done) => {
        chai.request(server)
            .get(`/lanes?dan=UTORAK&rv=rvg`)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });


    it('it should throw an error code when sending invalid query parameters - rv', (done) => {
        chai.request(server)
            .get(`/lanes?dan=r&rv=RVNASELJE`)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
});
