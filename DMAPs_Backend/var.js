const CryptoJS = require("crypto-js");
exports.CryptoJS = CryptoJS;

const jwt = require('jsonwebtoken');
exports.jwt = jwt;

var LMS_Auth = 'Basic dEV6REF2WTJicmJGOXh6THg1ZW5XdnJYYkU1YWtIOg==';
var LMS_Cookie = 'AWSALB=Cy7gaB4vSZdITJz6By7OvMTjLKHmfEHlh1ngSdhRaqNsYDsuYlYZE/hnbxIDiFBPxCPJKkTD4Zqf0050mypzEW2HEag8DkgHDHFrn0KWz/gqqudmZyyGQ3TTw2Nq; AWSALBCORS=Cy7gaB4vSZdITJz6By7OvMTjLKHmfEHlh1ngSdhRaqNsYDsuYlYZE/hnbxIDiFBPxCPJKkTD4Zqf0050mypzEW2HEag8DkgHDHFrn0KWz/gqqudmZyyGQ3TTw2Nq; PHPSESSID=elb~to46765nfgv18nrtnhsf8661ba';
exports.LMS_Auth = LMS_Auth;
exports.LMS_Cookie = LMS_Cookie;

var myFunc1 = function() {
    express = require('express');
    mysql = require('mysql');
    multer = require('multer');
    bodyParser = require('body-parser');
    bcrypt = require('bcryptjs');

    // local database viariable
    mysqlHost = '127.0.0.1';
    mysqlPwd = '@ff19E$P';

 
    // knex environemt
    knex1 = require('knex')({
        client: 'mysql',
        connection: {
            host: mysqlHost,
            user: 'root',
            password: mysqlPwd,
            database: 'dmaps',
            timezone: 'IST'
        },
        pool: { min: 0, max: 7 }
    });

    // mysql environment
    con = mysql.createConnection({
        host: mysqlHost,
        user: "root",
        password: mysqlPwd,
        multipleStatements: true,
        connectionLimit: 100,
        queueLimit: 100,
        acquireTimeout: 1000000
    });

    // mysql pool
    pool = mysql.createPool({
        host: mysqlHost,
        user: "root",
        password: mysqlPwd,
        multipleStatements: true,
        connectionLimit: 100,
        queueLimit: 100,
        acquireTimeout: 100000,
        debug: false
    });
};
exports.myFunc1 = myFunc1;

var verify = function(req, res, next) {

    const bearerHeader = 'Bearer ' + req.query.token;
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}

exports.verify = verify;
    var logUserActivity = function(authData, msg) {
}

exports.logUserActivity = logUserActivity;


// Handle the respose being sent to API request.
var sendResponse = function(req, res, dataArgs) {

    res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
    });

    res.status(parseInt(dataArgs.status)).send(
        [{
            // data : getEncryptData( dataArgs.data )
            data: dataArgs.data
        }]
    );
}
exports.sendResponse = sendResponse;