/* eslint-disable */
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const notificationModule = require('../src/notification');
/* eslint-enable */

const app = express();

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
const router = notificationModule.notificationRouter({
    API_KEY: process.env.API_KEY,
    NOTIFICATION_API: process.env.NOTIFICATION_API,
});

app.use('', router);

app.get('/status', (req, res) => {
    res.send({ status: 'ok' });
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Example API listening on port ${port}!`)); // eslint-disable-line

module.exports = app;
