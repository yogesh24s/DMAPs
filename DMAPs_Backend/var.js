var DMAPFunc = function() {
    express = require('express');
    mysql = require('mysql');
    multer = require('multer');
    bodyParser = require('body-parser');

    // local database viariable
    // mysqlHost = '3.92.91.120';
    mysqlHost = '127.0.0.1';

    // mysqlPwd = '@ff19E$P';
    mysqlPwd = 'affine123';
 
    // knex environemt
    knex = require('knex')({
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
exports.DMAPFunc = DMAPFunc;

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