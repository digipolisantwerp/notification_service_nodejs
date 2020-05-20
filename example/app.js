/* eslint-disable */
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const notificationModule = require('../src/notification');
/* eslint-enable */

const app = express();
const router = express.Router();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set special headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    next();
});


// api endpoints
notificationModule(router, '/api/v1/notifications');

app.use('', router);

app.get('/status', (req, res) => {
    res.send({ status: 'ok' });
});

app.set('port', process.env.PORT);

console.log('nodestartup on port', process.env.PORT); // eslint-disable-line

module.exports = app;
