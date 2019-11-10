/**
 * Created by Aleksandar Babic on 19.11.17..
 * Take a look at my portfolio at https://aleksandar.alfa-ing.com
 */

module.exports = class BusTwoWay {
    constructor(id, broj, naziv, linijaA, linijaB,
                dan, rasporedA = {},
                rasporedB = {}, dodaci) {
        this.id = id;
        this.broj = broj;
        this.naziv = naziv;
        this.linijaA = linijaA;
        this.linijaB = linijaB;
        this.dan = dan;
        this.rasporedA = rasporedA;
        this.rasporedB = rasporedB;
        this.dodaci = dodaci;
    }
};