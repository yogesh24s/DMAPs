'use strict';
const cors = require('cors');
// Bring in our dependencies
var app = require('express')();
var helmet = require('helmet');
var compression = require('compression');
var bodyParser = require('body-parser');
var http = require('http');
var https = require('https');
var rfs = require('rotating-file-stream');
var fs = require('fs');
var morgan = require('morgan');
var path = require('path');

// Below one is required to set the jobs before starting the API server.
var access = require('./var.js');

var loginRoutes = require('./routes/login');
var basicDetails = require('./routes/basic-details');
var administrator = require('./routes/Administrator');
// const authUrl = oAuth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: 'https://www.googleapis.com/auth/gmail.send'
//   });
  
//   console.log('Authorize this app by visiting this URL:', authUrl);

access.DMAPFunc();
require('console-stamp')(console, '[yyyy-mm-dd HH:MM:ss.l]');
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: false }));
app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware

    // Request modifications
    // Decrypt the data received from POST and PUT requests here.
    if (req.method === 'POST' || req.method === 'PUT') {
        if (req.headers && req.headers['content-type'] && req.headers['content-type'].indexOf('multipart/form-data') !== -1) {
            // Do anything you wanted for files.
            console.log("Expecting nothing to decrypt as request data is not encrypted.");
        } else {
            // req.body = access.getDecryptData( req.body.data );
            req.body = req.body.data;
        }
    }
    next();
});

app.use(function(req, res, next) {
    next();
    // if (
    //     req.url.indexOf('/authenticate') !== -1 ||
    //     req.url.indexOf('/api/forgotPassword') !== -1 ||
    //     req.url.indexOf('/static') !== -1
    // ) {
    //     next();
    // } else {
        // var token = '';
        // if (req.headers['authorization']) {
        //     token = req.headers['authorization'];
        // } else {
        //     token = req.token || req.query.token;
        // }
        // if (!token) {
        //     console.log("No token for the url : " + req.url);
        //     res.sendStatus(403);
        // } else {
        //     access.jwt.verify(token, 'secretkey', (err, authData) => {
        //         if (err) {
        //             res.sendStatus(403);
        //         } else {
        //             req.authData = authData;
        //             next();
        //         }
        //     });
        // }
    // }
});

//generating secret key for jwt
const crypto = require('crypto');

const generateRandomKey = () => {
  return crypto.randomBytes(32).toString('hex'); // 32 bytes converted to a hexadecimal string
};

console.log(generateRandomKey());

//  Connect all our routes to our application
app.use('/', loginRoutes);
app.use('/', basicDetails);
app.use('/', administrator);

// app.use('/', basicInformation);

/* Below block of code for starting API */
fs.readFile('/opt/iamhrisproductionserver', 'utf8', function(err, contents) {
    var nowDateTime = new Date();
    if (err) {
        http.createServer(app).listen(4000, function() {
            console.log(`App listening with http on port 4000. Started at ${nowDateTime}`);
        });
    } else {
        var options = {
            key: fs.readFileSync('private.key'),
            cert: fs.readFileSync('certificate.crt'),
            ca: [fs.readFileSync('ca_bundle.crt')]
        };
        https.createServer(options, app).listen(3200, function() {
            console.log(`App listening with https on port 3200. Started at ${nowDateTime}`);
        });
    }
});
