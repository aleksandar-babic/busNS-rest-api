/**
 * Created by Aleksandar Babic on 19.11.17..
 * Take a look at my portfolio at https://aleksandar.alfa-ing.com
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const busSchema = new Schema(
    {
        id: { type: String, required: true },
        linijaA: { type: String },
        linijaB: { type: String },
        dan: { type: String, enum: ['R', 'S', 'N'] },
        rasporedA: {type: Object, default: {}},
        rasporedB: {type: Object, default: {}},
        dodaci: {type: String}
    }
);


module.exports = mongoose.model('BusTwoWay', busSchema);