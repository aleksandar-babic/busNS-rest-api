/**
 * Created by Aleksandar Babic on 19.11.17..
 * Take a look at my portfolio at https://aleksandar.alfa-ing.com
 */
process.env.NODE_ENV = 'test';
const mongoose = require('mongoose');
const chai = require('chai');
const server = require('../server');
const should = chai.should();
const assert = chai.assert;

const utilsScraper = require('../api/utils/gspnsScraper');
const utilsBuildUrl = require('../api/utils/gspnsBuildUrl');

let countCity, countNonCity;


describe('Scraper', () => {

    describe('Lanes', () => {
        "use strict";
        it('it should return all city bus lanes on work days', (done) => {
            utilsScraper.scrapeLaneCity('R').then(lanes => {
                lanes.should.be.a('array').that.have.lengthOf.at.least(15);
                countCity = lanes.length;
                done();
            })
        });


        "use strict";
        it('it should return all city bus lanes on saturday', (done) => {
            utilsScraper.scrapeLaneCity('S').then(lanes => {
                lanes.should.be.a('array').that.have.lengthOf.at.least(15);
                done();
            })
        });


        "use strict";
        it('it should return all city bus lanes on sunday', (done) => {
            utilsScraper.scrapeLaneCity('N').then(lanes => {
                lanes.should.be.a('array').that.have.lengthOf.at.least(15);
                done();
            })
        });


        "use strict";
        it('it should return all city bus lanes when no day is specified', (done) => {
            utilsScraper.scrapeLaneCity().then(lanes => {
                lanes.should.be.a('array').that.have.lengthOf.at.least(15);
                lanes.should.have.lengthOf(countCity);
                done();
            })
        });


        "use strict";
        it('it should return all non city bus lanes on work days', (done) => {
            utilsScraper.scrapeLaneNonCity('R').then(lanes => {
                countNonCity = lanes.length;
                lanes.should.be.a('array').that.have.lengthOf.at.least(25);
                done();
            })
        });


        "use strict";
        it('it should return all non city bus lanes on saturday', (done) => {
            utilsScraper.scrapeLaneNonCity('S').then(lanes => {
                lanes.should.be.a('array').that.have.lengthOf.at.least(25);
                done();
            })
        });


        "use strict";
        it('it should return all non city bus lanes on sunday', (done) => {
            utilsScraper.scrapeLaneNonCity('N').then(lanes => {
                lanes.should.be.a('array').that.have.lengthOf.at.least(25);
                done();
            });
        });


        "use strict";
        it('it should return all non city bus lanes when no day is specified', (done) => {
            utilsScraper.scrapeLaneNonCity().then(lanes => {
                lanes.should.be.a('array').that.have.lengthOf.at.least(25);
                lanes.should.have.lengthOf(countNonCity);
                done();
            })
        });
    });

    describe('Buses', () => {

        "use strict";
        it('it should return bus schedule for bus number 11A on work days', (done) => {
            utilsScraper.scrapeBus('11A.', 'R', 'rvg').then(lane => {
                lane.should.be.a('object').that.is.not.empty;
                lane.should.have.property('linija').that.is.a('string').and.is.not.empty;
                lane.should.have.property('dan').that.is.a('string').and.has.lengthOf(1);
                lane.should.have.property('id').that.is.a('string').and.has.lengthOf(4);
                lane.should.have.property('raspored').that.is.a('object');
                assert.equal(Object.keys(lane.raspored).length, 20);
                done();
            })
        });

        "use strict";
        it('it should return bus schedule for bus number 11A on saturday', (done) => {
            utilsScraper.scrapeBus('11A.', 'S', 'rvg').then(lane => {
                lane.should.be.a('object').that.is.not.empty;
                lane.should.have.property('linija').that.is.a('string').and.is.not.empty;
                lane.should.have.property('dan').that.is.a('string').and.has.lengthOf(1);
                lane.should.have.property('id').that.is.a('string').and.has.lengthOf(4);
                lane.should.have.property('raspored').that.is.a('object');
                assert.equal(Object.keys(lane.raspored).length, 20);
                done();
            })
        });

        "use strict";
        it('it should return bus schedule for bus number 11A on sunday', (done) => {
            utilsScraper.scrapeBus('11A.', 'N', 'rvg').then(lane => {
                lane.should.be.a('object').that.is.not.empty;
                lane.should.have.property('linija').that.is.a('string').and.is.not.empty;
                lane.should.have.property('dan').that.is.a('string').and.has.lengthOf(1);
                lane.should.have.property('id').that.is.a('string').and.has.lengthOf(4);
                lane.should.have.property('raspored').that.is.a('object');
                assert.equal(Object.keys(lane.raspored).length, 20);
                done();
            })
        });

        "use strict";
        it('it should return bus schedule for bus number 11B on work days', (done) => {
            utilsScraper.scrapeBus('11B.', 'R', 'rvg').then(lane => {
                lane.should.be.a('object').that.is.not.empty;
                lane.should.have.property('linija').that.is.a('string').and.is.not.empty;
                lane.should.have.property('dan').that.is.a('string').and.has.lengthOf(1);
                lane.should.have.property('id').that.is.a('string').and.has.lengthOf(4);
                lane.should.have.property('raspored').that.is.a('object');
                assert.equal(Object.keys(lane.raspored).length, 20);
                done();
            })
        });

        "use strict";
        it('it should return bus schedule for bus number 11B on saturday', (done) => {
            utilsScraper.scrapeBus('11B.', 'S', 'rvg').then(lane => {
                lane.should.be.a('object').that.is.not.empty;
                lane.should.have.property('linija').that.is.a('string').and.is.not.empty;
                lane.should.have.property('dan').that.is.a('string').and.has.lengthOf(1);
                lane.should.have.property('id').that.is.a('string').and.has.lengthOf(4);
                lane.should.have.property('raspored').that.is.a('object');
                assert.equal(Object.keys(lane.raspored).length, 20);
                done();
            })
        });

        "use strict";
        it('it should return bus schedule for bus number 11B on sunday', (done) => {
            utilsScraper.scrapeBus('11B.', 'N', 'rvg').then(lane => {
                lane.should.be.a('object').that.is.not.empty;
                lane.should.have.property('linija').that.is.a('string').and.is.not.empty;
                lane.should.have.property('dan').that.is.a('string').and.has.lengthOf(1);
                lane.should.have.property('id').that.is.a('string').and.has.lengthOf(4);
                lane.should.have.property('raspored').that.is.a('object');
                assert.equal(Object.keys(lane.raspored).length, 20);
                done();
            })
        });


        "use strict";
        it('it should return bus schedule for bus number 7A on work days', (done) => {
            utilsScraper.scrapeBus('7A.', 'R', 'rvg').then(lane => {
                lane.should.be.a('object').that.is.not.empty;
                lane.should.have.property('linija').that.is.a('string').and.is.not.empty;
                lane.should.have.property('dan').that.is.a('string').and.has.lengthOf(1);
                lane.should.have.property('id').that.is.a('string').and.has.lengthOf(3);
                lane.should.have.property('raspored').that.is.a('object');
                assert.equal(Object.keys(lane.raspored).length, 21);
                done();
            })
        });

        "use strict";
        it('it should return bus schedule for bus number 7A on saturday', (done) => {
            utilsScraper.scrapeBus('7A.', 'S', 'rvg').then(lane => {
                lane.should.be.a('object').that.is.not.empty;
                lane.should.have.property('linija').that.is.a('string').and.is.not.empty;
                lane.should.have.property('dan').that.is.a('string').and.has.lengthOf(1);
                lane.should.have.property('id').that.is.a('string').and.has.lengthOf(3);
                lane.should.have.property('raspored').that.is.a('object');
                assert.equal(Object.keys(lane.raspored).length, 21);
                done();
            })
        });

        "use strict";
        it('it should return bus schedule for bus number 7A on sunday', (done) => {
            utilsScraper.scrapeBus('7A.', 'N', 'rvg').then(lane => {
                lane.should.be.a('object').that.is.not.empty;
                lane.should.have.property('linija').that.is.a('string').and.is.not.empty;
                lane.should.have.property('dan').that.is.a('string').and.has.lengthOf(1);
                lane.should.have.property('id').that.is.a('string').and.has.lengthOf(3);
                lane.should.have.property('raspored').that.is.a('object');
                assert.equal(Object.keys(lane.raspored).length, 21);
                done();
            })
        });

        "use strict";
        it('it should return bus schedule for bus number 7B on work days', (done) => {
            utilsScraper.scrapeBus('7B.', 'R', 'rvg').then(lane => {
                lane.should.be.a('object').that.is.not.empty;
                lane.should.have.property('linija').that.is.a('string').and.is.not.empty;
                lane.should.have.property('dan').that.is.a('string').and.has.lengthOf(1);
                lane.should.have.property('id').that.is.a('string').and.has.lengthOf(3);
                lane.should.have.property('raspored').that.is.a('object');
                assert.equal(Object.keys(lane.raspored).length, 20);
                done();
            })
        });

        "use strict";
        it('it should return bus schedule for bus number 7B on saturday', (done) => {
            utilsScraper.scrapeBus('7B.', 'S', 'rvg').then(lane => {
                lane.should.be.a('object').that.is.not.empty;
                lane.should.have.property('linija').that.is.a('string').and.is.not.empty;
                lane.should.have.property('dan').that.is.a('string').and.has.lengthOf(1);
                lane.should.have.property('id').that.is.a('string').and.has.lengthOf(3);
                lane.should.have.property('raspored').that.is.a('object');
                assert.equal(Object.keys(lane.raspored).length, 20);
                done();
            })
        });

        "use strict";
        it('it should return bus schedule for bus number 7B on sunday', (done) => {
            utilsScraper.scrapeBus('7B.', 'N', 'rvg').then(lane => {
                lane.should.be.a('object').that.is.not.empty;
                lane.should.have.property('linija').that.is.a('string').and.is.not.empty;
                lane.should.have.property('dan').that.is.a('string').and.has.lengthOf(1);
                lane.should.have.property('id').that.is.a('string').and.has.lengthOf(3);
                lane.should.have.property('raspored').that.is.a('object');
                assert.equal(Object.keys(lane.raspored).length, 20);
                done();
            })
        });

        "use strict";
        it('it should return message with error that bus does not exist', (done) => {
            utilsScraper.scrapeBus('11ASDF', 'R', 'rvg')
                .then(data => {
                //Do nothing, promise should be rejected
            })
                .catch(error => {
                    error.should.be.a('object').that.has.property('message');
                    assert(error.message, 'Error while getting bus schedule, double check bus lane number.');
                    done();
                });
        });

        "use strict";
        it('it should return message with error that bus does not exist', (done) => {
            utilsScraper.scrapeBus('11ASDF', 'R', 'rvp')
                .then(data => {
                    //Do nothing, promise should be rejected
                })
                .catch(error => {
                    error.should.be.a('object').that.has.property('message');
                    assert(error.message, 'Error while getting bus schedule, double check bus lane number.');
                    done();
                });
        });

        "use strict";
        it('it should return message with error that bus does not exist (Bus 5N is only active on sundays, but its requested on work day)', (done) => {
            utilsScraper.scrapeBus('5N.', 'R', 'rvp')
                .then(data => {
                    //Do nothing, promise should be rejected
                })
                .catch(error => {
                    error.should.be.a('object').that.has.property('message');
                    assert(error.message, 'Error while getting bus schedule, double check bus lane number.');
                    done();
                });
        });

        "use strict";
        it('it should return message with error that bus does not exist (Bus 5N is only active on sundays, but its requested on saturday)', (done) => {
            utilsScraper.scrapeBus('5N.', 'S', 'rvp')
                .then(data => {
                    //Do nothing, promise should be rejected
                })
                .catch(error => {
                    error.should.be.a('object').that.has.property('message');
                    assert(error.message, 'Error while getting bus schedule, double check bus lane number.');
                    done();
                });
        });

        "use strict";
        it('it should return bus schedule for bus number 5N on sunday (only day for this bus)', (done) => {
            utilsScraper.scrapeBus('5n.', 'N', 'rvg').then(lane => {
                lane.should.be.a('object').that.is.not.empty;
                lane.should.have.property('linijaA').that.is.a('string').and.is.not.empty;
                lane.should.have.property('linijaB').that.is.a('string').and.is.not.empty;
                lane.should.have.property('dan').that.is.a('string').and.has.lengthOf(1);
                lane.should.have.property('id').that.is.a('string').and.has.lengthOf(3);
                lane.should.have.property('rasporedA').that.is.a('object');
                lane.should.have.property('rasporedB').that.is.a('object');
                assert.equal(Object.keys(lane.rasporedA).length, 9);
                assert.equal(Object.keys(lane.rasporedB).length, 8);
                done();
            })
        });

        "use strict";
        it('it should return bus schedule for bus number 18A on work days', (done) => {
            utilsScraper.scrapeBus('18A', 'R', 'rvg').then(lane => {
                lane.should.be.a('object').that.is.not.empty;
                lane.should.have.property('linija').that.is.a('string').and.is.not.empty;
                lane.should.have.property('dan').that.is.a('string').and.has.lengthOf(1);
                lane.should.have.property('id').that.is.a('string').and.has.lengthOf(3);
                lane.should.have.property('raspored').that.is.a('object');
                assert.equal(Object.keys(lane.raspored).length, 4);
                done();
            })
        });

        "use strict";
        it('it should return bus schedule for bus number 18A on saturday', (done) => {
            utilsScraper.scrapeBus('18A', 'S', 'rvg').then(lane => {
                lane.should.be.a('object').that.is.not.empty;
                lane.should.have.property('linija').that.is.a('string').and.is.not.empty;
                lane.should.have.property('dan').that.is.a('string').and.has.lengthOf(1);
                lane.should.have.property('id').that.is.a('string').and.has.lengthOf(3);
                lane.should.have.property('raspored').that.is.a('object');
                assert.equal(Object.keys(lane.raspored).length, 4);
                done();
            })
        });
        "use strict";
        it('it should return bus schedule for bus number 18A on sunday', (done) => {
            utilsScraper.scrapeBus('18A', 'N', 'rvg').then(lane => {
                lane.should.be.a('object').that.is.not.empty;
                lane.should.have.property('linija').that.is.a('string').and.is.not.empty;
                lane.should.have.property('dan').that.is.a('string').and.has.lengthOf(1);
                lane.should.have.property('id').that.is.a('string').and.has.lengthOf(3);
                lane.should.have.property('raspored').that.is.a('object');
                assert.equal(Object.keys(lane.raspored).length, 4);
                done();
            })
        });

        "use strict";
        it('it should return bus schedule for bus number 18B on work days', (done) => {
            utilsScraper.scrapeBus('18B', 'R', 'rvg').then(lane => {
                lane.should.be.a('object').that.is.not.empty;
                lane.should.have.property('linija').that.is.a('string').and.is.not.empty;
                lane.should.have.property('dan').that.is.a('string').and.has.lengthOf(1);
                lane.should.have.property('id').that.is.a('string').and.has.lengthOf(3);
                lane.should.have.property('raspored').that.is.a('object');
                assert.equal(Object.keys(lane.raspored).length, 5);
                done();
            })
        });

        "use strict";
        it('it should return bus schedule for bus number 18B on saturday', (done) => {
            utilsScraper.scrapeBus('18B', 'S', 'rvg').then(lane => {
                lane.should.be.a('object').that.is.not.empty;
                lane.should.have.property('linija').that.is.a('string').and.is.not.empty;
                lane.should.have.property('dan').that.is.a('string').and.has.lengthOf(1);
                lane.should.have.property('id').that.is.a('string').and.has.lengthOf(3);
                lane.should.have.property('raspored').that.is.a('object');
                assert.equal(Object.keys(lane.raspored).length, 5);
                done();
            })
        });
        "use strict";
        it('it should return bus schedule for bus number 18B on sunday', (done) => {
            utilsScraper.scrapeBus('18B', 'N', 'rvg').then(lane => {
                lane.should.be.a('object').that.is.not.empty;
                lane.should.have.property('linija').that.is.a('string').and.is.not.empty;
                lane.should.have.property('dan').that.is.a('string').and.has.lengthOf(1);
                lane.should.have.property('id').that.is.a('string').and.has.lengthOf(3);
                lane.should.have.property('raspored').that.is.a('object');
                assert.equal(Object.keys(lane.raspored).length, 5);
                done();
            })
        });

        "use strict";
        it('it should return bus schedule for bus number 9 on work days', (done) => {
            utilsScraper.scrapeBus('9.', 'R', 'rvg').then(lane => {
                lane.should.be.a('object').that.is.not.empty;
                lane.should.have.property('linijaA').that.is.a('string').and.is.not.empty;
                lane.should.have.property('linijaB').that.is.a('string').and.is.not.empty;
                lane.should.have.property('dan').that.is.a('string').and.has.lengthOf(1);
                lane.should.have.property('id').that.is.a('string').and.has.lengthOf(2);
                lane.should.have.property('rasporedA').that.is.a('object');
                lane.should.have.property('rasporedB').that.is.a('object');
                assert.equal(Object.keys(lane.rasporedA).length, 21);
                assert.equal(Object.keys(lane.rasporedB).length, 21);
                done();
            })
        });

        "use strict";
        it('it should return bus schedule for bus number 9 on saturday', (done) => {
            utilsScraper.scrapeBus('9.', 'S', 'rvg').then(lane => {
                lane.should.be.a('object').that.is.not.empty;
                lane.should.have.property('linijaA').that.is.a('string').and.is.not.empty;
                lane.should.have.property('linijaB').that.is.a('string').and.is.not.empty;
                lane.should.have.property('dan').that.is.a('string').and.has.lengthOf(1);
                lane.should.have.property('id').that.is.a('string').and.has.lengthOf(2);
                lane.should.have.property('rasporedA').that.is.a('object');
                lane.should.have.property('rasporedB').that.is.a('object');
                assert.equal(Object.keys(lane.rasporedA).length, 21);
                assert.equal(Object.keys(lane.rasporedB).length, 21);
                done();
            })
        });

        "use strict";
        it('it should return bus schedule for bus number 9 on sunday', (done) => {
            utilsScraper.scrapeBus('9.', 'N', 'rvg').then(lane => {
                lane.should.be.a('object').that.is.not.empty;
                lane.should.have.property('linijaA').that.is.a('string').and.is.not.empty;
                lane.should.have.property('linijaB').that.is.a('string').and.is.not.empty;
                lane.should.have.property('dan').that.is.a('string').and.has.lengthOf(1);
                lane.should.have.property('id').that.is.a('string').and.has.lengthOf(2);
                lane.should.have.property('rasporedA').that.is.a('object');
                lane.should.have.property('rasporedB').that.is.a('object');
                assert.equal(Object.keys(lane.rasporedA).length, 21);
                assert.equal(Object.keys(lane.rasporedB).length, 21);
                done();
            })
        });

        "use strict";
        it('it should return bus schedule for bus number 5 on work days', (done) => {
            utilsScraper.scrapeBus('5', 'R', 'rvg').then(lane => {
                lane.should.be.a('object').that.is.not.empty;
                lane.should.have.property('linijaA').that.is.a('string').and.is.not.empty;
                lane.should.have.property('linijaB').that.is.a('string').and.is.not.empty;
                lane.should.have.property('dan').that.is.a('string').and.has.lengthOf(1);
                lane.should.have.property('id').that.is.a('string').and.has.lengthOf(1);
                lane.should.have.property('rasporedA').that.is.a('object');
                lane.should.have.property('rasporedB').that.is.a('object');
                assert.equal(Object.keys(lane.rasporedA).length, 21);
                assert.equal(Object.keys(lane.rasporedB).length, 21);
                done();
            })
        });

        "use strict";
        it('it should return bus schedule for bus number 5 on saturday', (done) => {
            utilsScraper.scrapeBus('5', 'S', 'rvg').then(lane => {
                lane.should.be.a('object').that.is.not.empty;
                lane.should.have.property('linijaA').that.is.a('string').and.is.not.empty;
                lane.should.have.property('linijaB').that.is.a('string').and.is.not.empty;
                lane.should.have.property('dan').that.is.a('string').and.has.lengthOf(1);
                lane.should.have.property('id').that.is.a('string').and.has.lengthOf(1);
                lane.should.have.property('rasporedA').that.is.a('object');
                lane.should.have.property('rasporedB').that.is.a('object');
                assert.equal(Object.keys(lane.rasporedA).length, 21);
                assert.equal(Object.keys(lane.rasporedB).length, 21);
                done();
            })
        });

        "use strict";
        it('it should return bus schedule for bus number 5 on sunday', (done) => {
            utilsScraper.scrapeBus('5', 'N', 'rvg').then(lane => {
                lane.should.be.a('object').that.is.not.empty;
                lane.should.have.property('linijaA').that.is.a('string').and.is.not.empty;
                lane.should.have.property('linijaB').that.is.a('string').and.is.not.empty;
                lane.should.have.property('dan').that.is.a('string').and.has.lengthOf(1);
                lane.should.have.property('id').that.is.a('string').and.has.lengthOf(1);
                lane.should.have.property('rasporedA').that.is.a('object');
                lane.should.have.property('rasporedB').that.is.a('object');
                assert.equal(Object.keys(lane.rasporedA).length, 21);
                assert.equal(Object.keys(lane.rasporedB).length, 21);
                done();
            })
        });

    });
});