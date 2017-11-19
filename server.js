/**
 * Created by Aleksandar Babic on 19.11.17..
 * Take a look at my portfolio at https://aleksandar.alfa-ing.com
 */

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = 8080;
const busesController = require('./api/controllers/buses');
const lanesController = require('./api/controllers/lanes');
const config = require('config');


//DB Connection
mongoose.connect(config.DBHost, {useMongoClient: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));

//Don't use morgan logging in test environment
if(config.util.getEnv('NODE_ENV') !== 'test') {
    app.use(morgan('combined')); //Apache style logs
}

//Setup body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

//Dummy home page route
app.get('/', (req, res) => res.json({message: 'Nothing to see here, go for docs!'}));

//Buses routes setup
app.route('/buses').get(busesController.getBuses);
app.route('/buses/:id').get(busesController.getBus);

//Lanes routes setup
app.route('/lanes').get(lanesController.getLanes);

app.listen(port);
console.log('Listening on port ' + port);

module.exports = app; // for testing