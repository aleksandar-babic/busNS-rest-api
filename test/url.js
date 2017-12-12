/**
 * Created by Aleksandar Babic on 19.11.17..
 * Take a look at my portfolio at https://aleksandar.alfa-ing.com
 */
process.env.NODE_ENV = 'test';
const chai = require('chai');
const server = require('../server');
const should = chai.should();

const utilsScraper = require('../api/utils/gspnsScraper');
const utilsBuildUrl = require('../api/utils/gspnsBuildUrl');

describe('URLs', () => {
    "use strict";
    describe('Get URL base values', () => {
        "use strict";
        it('it should return all possible base values for request', (done) => {
            utilsBuildUrl.getUrlBaseValues()
                .then(data => {
                    data.should.be.a('object');
                    data.should.have.property('vaziod').with.lengthOf(1);
                    data.should.have.property('vaziodTekst').with.lengthOf(1);
                    data.should.have.property('rv').with.lengthOf(2);
                    data.should.have.property('rvTekst').with.lengthOf(2);
                    data.should.have.property('dan').with.lengthOf(3);
                    data.should.have.property('danTekst').with.lengthOf(3);
                    data.should.have.property('baseUrl').that.is.an('string');
                    done();
                });
        });
    });
});