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
const assert = chai.assert;
const Bus = require('../api/model/bus');

chai.use(chaiHttp);

/**
 * Holds all tests related to Buses endpoint(s)
 */
describe('Buses', () => {
    "use strict";
    //TODO Implement beforeEach when caching is implemented
   /* beforeEach((done) => {
        Bus.remove({})
            .then(() => done());
    });*/

    describe('/GET buses/:id', () => {

        "use strict";
        it('it should return error because arguments are not valid(dan missing)', (done) => {
            chai.request(server)
                .get('/buses/11A?rv=rvg')
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object').that.has.property('message');
                    assert.equal(res.body.message, 'Malformed request, query parameters dan and rv are required.');
                    done();
                });
        });

        "use strict";
        it('it should return error because arguments are not valid(rv missing)', (done) => {
            chai.request(server)
                .get('/buses/11A?dan=R')
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object').that.has.property('message');
                    assert.equal(res.body.message, 'Malformed request, query parameters dan and rv are required.');
                    done();
                });
        });

        "use strict";
        it('it should return error that dan value is not valid', (done) => {
            chai.request(server)
                .get('/buses/11A?dan=FF&rv=rvg')
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object').that.has.property('message');
                    assert.equal(res.body.message, 'Malformed request, allowed values for query parameter dan are \'R\', \'S\', \'N\'');
                    done();
                });
        });

        "use strict";
        it('it should return error that rv value is not valid', (done) => {
            chai.request(server)
                .get('/buses/11A?dan=r&rv=rvgSDF')
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object').that.has.property('message');
                    assert.equal(res.body.message, 'Malformed request, allowed values for query parameter rv are \'rvg\', \'rvp\'');
                    done();
                });
        });

        "use strict";
        it('it should return error because that bus does not exist', (done) => {
            chai.request(server)
                .get('/buses/11ASD?dan=r&rv=rvg')
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a('object').that.has.property('message');
                    assert(res.body.message, 'Error while getting bus schedule, double check bus lane number.');
                    done();
                });
        });

        "use strict";
        it('it should return error because that bus does not exist in non city lanes pool', (done) => {
            chai.request(server)
                .get('/buses/11A?dan=r&rv=rvp')
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a('object').that.has.property('message');
                    assert(res.body.message, 'Error while getting bus schedule, double check bus lane number.');
                    done();
                });
        });

        "use strict";
        it('it should return bus(11A) object with all data', (done) => {
            chai.request(server)
                .get('/buses/11a.?dan=r&rv=rvg')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object').that.is.not.empty;
                    res.body.should.have.property('linija').that.is.a('string').and.is.not.empty;
                    res.body.should.have.property('dan').that.is.a('string').and.has.lengthOf(1);
                    res.body.should.have.property('id').that.is.a('string').and.has.lengthOf(4);
                    res.body.should.have.property('raspored').that.is.a('object');
                    assert.equal(Object.keys(res.body.raspored).length, 20);
                    done();
                });
        });

        "use strict";
        it('it should return bus lane object with all data', (done) => {
            chai.request(server)
                .get('/buses/9.?dan=r&rv=rvg')
                .end((err, res) => {
                    res.body.should.be.a('object').that.is.not.empty;
                    res.body.should.have.property('linijaA').that.is.a('string').and.is.not.empty;
                    res.body.should.have.property('linijaB').that.is.a('string').and.is.not.empty;
                    res.body.should.have.property('dan').that.is.a('string').and.has.lengthOf(1);
                    res.body.should.have.property('id').that.is.a('string').and.has.lengthOf(2);
                    res.body.should.have.property('rasporedA').that.is.a('object');
                    res.body.should.have.property('rasporedB').that.is.a('object');
                    assert.equal(Object.keys(res.body.rasporedA).length, 21);
                    assert.equal(Object.keys(res.body.rasporedB).length, 21);
                    done();
                });
        });

    });



});
