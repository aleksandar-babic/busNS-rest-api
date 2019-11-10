/**
 * Created by Aleksandar Babic on 21.11.17..
 * Take a look at my portfolio at https://aleksandar.alfa-ing.com
 */

module.exports = class Bus {
    constructor(id, broj, naziv, linija, dan, raspored = {}, dodaci) {
        this.id = id;
        this.broj = broj;
        this.naziv = naziv;
        this.linija = linija;
        this.dan = dan;
        this.raspored = raspored;
        this.dodaci = dodaci;
    }
};