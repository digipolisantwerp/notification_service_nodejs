let express = require('express');
let logger = require('morgan');
let bodyParser = require('body-parser');
let dotenv = require('dotenv').config()

let app = express();
const router = express.Router();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set special headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    next();
});


// api endpoints
require('../src/notification')(router, '/api/v1/notifications')

app.use('', router);

app.set('port', process.env.PORT);

console.log('nodestartup on port', process.env.PORT)

module.exports = app;
