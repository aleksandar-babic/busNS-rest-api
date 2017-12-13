/**
 * Created by Aleksandar Babic on 19.11.17..
 * Take a look at my portfolio at https://aleksandar.alfa-ing.com
 */

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const port = 8080;
const busesController = require('./api/controllers/buses');
const lanesController = require('./api/controllers/lanes');

//Don't use morgan logging in test environment
if(process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined')); //Apache style logs
}

//Change swagger host if BASE_HOST env variable is set
if(process.env.BASE_HOST){
    swaggerDocument.host = `${process.env.BASE_HOST}:${port}`;
} else {
    swaggerDocument.host = `localhost:${port}`;
}

//Setup body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

//Buses routes setup
app.route('/buses').get(busesController.getBuses);
app.route('/buses/:id').get(busesController.getBus);

//Lanes routes setup
app.route('/lanes').get(lanesController.getLanes);

//Swagger UI setup
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port);
console.log('Listening on port ' + port);

module.exports = app; // for testing