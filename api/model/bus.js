/**
 * Created by Aleksandar Babic on 21.11.17..
 * Take a look at my portfolio at https://aleksandar.alfa-ing.com
 */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const busSchema = new Schema(
    {
        id: { type: String, required: true },
        linija: { type: String },
        dan: { type: String, enum: ['R', 'S', 'N'] },
        raspored: {type: Object, default: {}},
        dodaci: {type: String}
    }
);


module.exports = mongoose.model('Bus', busSchema);